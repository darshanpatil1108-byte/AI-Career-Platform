from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import mysql.connector
import pdfplumber
import random
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

client = Groq(api_key="YOUR_GROQ_API_KEY")


def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="darshan123",
        database="ai_career_platform"
    )


@app.route("/")
def home():
    return "✅ Backend Running Successfully"


@app.route("/register", methods=["POST"])
def register():
    data = request.json

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        sql = """
        INSERT INTO students
        (name, register_number, mobile, email, password, area, city, pincode)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """

        values = (
            data["name"],
            data["registerNumber"],
            data["mobile"],
            data["email"],
            data["password"],
            data["area"],
            data["city"],
            data["pincode"]
        )

        cursor.execute(sql, values)

        cursor.execute(
            """
            INSERT INTO progress
            (student_email, learning, resume, interview, roadmap)
            VALUES (%s,0,0,0,0)
            """,
            (data["email"],)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Account created successfully"
        })

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 400


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM students WHERE email=%s AND password=%s",
        (data["email"], data["password"])
    )

    student = cursor.fetchone()

    cursor.close()
    conn.close()

    if student:
        return jsonify({
            "message": "Login successful",
            "student": student
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


@app.route("/get-progress/<email>", methods=["GET"])
def get_progress(email):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT learning, resume, interview, roadmap
        FROM progress
        WHERE student_email=%s
        """,
        (email,)
    )

    progress = cursor.fetchone()

    cursor.close()
    conn.close()

    if progress:
        return jsonify(progress)

    return jsonify({
        "learning": 0,
        "resume": 0,
        "interview": 0,
        "roadmap": 0
    })


@app.route("/update-progress", methods=["POST"])
def update_progress():

    data = request.json

    email = data["email"]
    field = data["field"]
    value = data["value"]

    allowed_fields = [
        "learning",
        "resume",
        "interview",
        "roadmap"
    ]

    if field not in allowed_fields:
        return jsonify({
            "message": "Invalid field"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    sql = f"""
    UPDATE progress
    SET {field}=%s
    WHERE student_email=%s
    """

    cursor.execute(sql, (value, email))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message": "Progress updated"
    })


@app.route("/answer", methods=["POST"])
def answer():

    data = request.json
    question = data.get("question", "")

    try:

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content":
                    "You are an AI interview assistant. Give beginner friendly answers."
                },

                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        return jsonify({
            "answer":
            response.choices[0].message.content
        })

    except Exception as e:

        return jsonify({
            "answer": str(e)
        })


@app.route("/analyze-resume", methods=["POST"])
def analyze_resume():

    file = request.files["resume"]

    text = ""

    with pdfplumber.open(file) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text

    prompt = f"""
Analyze this resume like ATS.

Give:
1. ATS score
2. Grammar mistakes
3. Missing keywords
4. Improvements

Resume:
{text}
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content":
                    "You are an ATS Resume Analyzer."
                },

                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        ai_result = response.choices[0].message.content

        return jsonify({
            "score": 90,
            "grammar_issues": [ai_result],
            "missing_keywords": ["AI suggestions available"],
            "suggestion": "Improve resume using AI suggestions."
        })

    except Exception as e:

        return jsonify({
            "score": 0,
            "grammar_issues": [str(e)],
            "missing_keywords": ["Error"],
            "suggestion": "Backend error"
        })


@app.route("/admin/students", methods=["GET"])
def admin_students():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT s.name, s.email,
               p.learning, p.resume,
               p.interview, p.roadmap
        FROM students s
        LEFT JOIN progress p
        ON s.email = p.student_email
    """)

    students = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(students)


@app.route("/leaderboard", methods=["GET"])
def leaderboard():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT s.name, s.email,
        ROUND(
        (p.learning + p.resume +
         p.interview + p.roadmap)/4
        ) AS total

        FROM students s
        JOIN progress p
        ON s.email = p.student_email

        ORDER BY total DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


@app.route("/placement-analytics", methods=["GET"])
def placement_analytics():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
        COUNT(*) AS total_students,

        SUM(
            CASE
            WHEN (
            (learning + resume +
             interview + roadmap)/4
            ) >= 90
            THEN 1
            ELSE 0
            END
        ) AS placement_ready,

        AVG(
        (learning + resume +
         interview + roadmap)/4
        ) AS average_progress

        FROM progress
    """)

    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(data)


@app.route("/send-otp", methods=["POST"])
def send_otp():

    data = request.json

    email = data["email"]

    otp = str(random.randint(100000, 999999))

    sender_email = "YOUR_GMAIL@gmail.com"

    app_password = "YOUR_GMAIL_APP_PASSWORD"

    message = MIMEText(
        f"Your AI Career Platform OTP is: {otp}"
    )

    message["Subject"] = "AI Career Platform OTP Verification"

    message["From"] = sender_email

    message["To"] = email

    try:

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            sender_email,
            app_password
        )

        server.sendmail(
            sender_email,
            email,
            message.as_string()
        )

        server.quit()

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "DELETE FROM otp_codes WHERE email=%s",
            (email,)
        )

        cursor.execute(
            """
            INSERT INTO otp_codes
            (email, otp)
            VALUES (%s, %s)
            """,
            (email, otp)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message":
            "OTP sent successfully to email"
        })

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


@app.route("/verify-otp", methods=["POST"])
def verify_otp():

    data = request.json

    email = data["email"]
    otp = data["otp"]

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM otp_codes
        WHERE email=%s AND otp=%s
        """,
        (email, otp)
    )

    result = cursor.fetchone()

    cursor.close()
    conn.close()

    if result:

        return jsonify({
            "message":
            "OTP verified successfully"
        })

    return jsonify({
        "message":
        "Invalid OTP"
    }), 400


if __name__ == "__main__":
    app.run(debug=True)