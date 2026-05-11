from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import mysql.connector
import pdfplumber
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASSWORD", "darshan123"),
        database=os.environ.get("DB_NAME", "ai_career_platform"),
        port=int(os.environ.get("DB_PORT", 3306))
    )


def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        register_number VARCHAR(50),
        mobile VARCHAR(20),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100),
        area VARCHAR(100),
        city VARCHAR(100),
        pincode VARCHAR(20)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS progress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_email VARCHAR(100),
        learning INT DEFAULT 0,
        resume INT DEFAULT 0,
        interview INT DEFAULT 0,
        roadmap INT DEFAULT 0
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject VARCHAR(100),
        type VARCHAR(50),
        title VARCHAR(150),
        content TEXT,
        video_url TEXT
    )
    """)

    conn.commit()
    cursor.close()
    conn.close()


@app.route("/")
def home():
    create_tables()
    return "✅ AI Career Platform Backend Running Successfully"


@app.route("/register", methods=["POST"])
def register():
    create_tables()
    data = request.json

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO students
            (name, register_number, mobile, email, password, area, city, pincode)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                data["name"],
                data["registerNumber"],
                data["mobile"],
                data["email"],
                data["password"],
                data["area"],
                data["city"],
                data["pincode"]
            )
        )

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

        return jsonify({"message": "Account created successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 400


@app.route("/login", methods=["POST"])
def login():
    create_tables()
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

    return jsonify({"message": "Invalid email or password"}), 401


@app.route("/get-progress/<email>", methods=["GET"])
def get_progress(email):
    create_tables()

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
    create_tables()
    data = request.json

    email = data["email"]
    field = data["field"]
    value = data["value"]

    allowed_fields = ["learning", "resume", "interview", "roadmap"]

    if field not in allowed_fields:
        return jsonify({"message": "Invalid field"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    sql = f"UPDATE progress SET {field}=%s WHERE student_email=%s"
    cursor.execute(sql, (value, email))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Progress updated successfully"})


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
                    "content": "You are a professional AI interview assistant. Give simple beginner-friendly answers."
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        return jsonify({
            "answer": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({"answer": str(e)})


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
4. Formatting mistakes
5. Improvements

Resume:
{text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert ATS resume analyzer."
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
            "missing_keywords": ["AI detected suggestions"],
            "grammar_issues": [ai_result],
            "suggestion": "Improve resume based on AI analysis."
        })

    except Exception as e:
        return jsonify({
            "score": 0,
            "missing_keywords": ["Error"],
            "grammar_issues": [str(e)],
            "suggestion": "Check backend or Groq API key."
        })


@app.route("/admin/students", methods=["GET"])
def admin_students():
    create_tables()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT s.name, s.email, s.register_number, s.mobile,
               p.learning, p.resume, p.interview, p.roadmap
        FROM students s
        LEFT JOIN progress p ON s.email = p.student_email
    """)

    students = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(students)


@app.route("/admin/add-course", methods=["POST"])
def add_course():
    create_tables()
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO courses
        (subject, type, title, content, video_url)
        VALUES (%s,%s,%s,%s,%s)
        """,
        (
            data["subject"],
            data["type"],
            data["title"],
            data["content"],
            data["video_url"]
        )
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Course content added successfully"})


@app.route("/courses", methods=["GET"])
def get_courses():
    create_tables()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM courses")
    courses = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(courses)


@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    create_tables()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT s.name, s.email,
        p.learning, p.resume, p.interview, p.roadmap,
        ROUND((p.learning + p.resume + p.interview + p.roadmap) / 4) AS total
        FROM students s
        JOIN progress p ON s.email = p.student_email
        ORDER BY total DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


@app.route("/placement-analytics", methods=["GET"])
def placement_analytics():
    create_tables()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
        COUNT(*) AS total_students,
        SUM(
            CASE
            WHEN ((learning + resume + interview + roadmap) / 4) >= 90
            THEN 1 ELSE 0 END
        ) AS placement_ready,
        AVG((learning + resume + interview + roadmap) / 4) AS average_progress
        FROM progress
    """)

    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(data)


if __name__ == "__main__":
    create_tables()
    app.run(host="0.0.0.0", port=5000)