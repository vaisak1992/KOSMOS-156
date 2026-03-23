import requests
import sys
import os

def send_telegram(message):
    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }
    requests.post(url, json=payload)

def main():
    status = sys.argv[1]  # "success" or "failure"
    repo = os.environ['GITHUB_REPOSITORY']
    run_id = os.environ['GITHUB_RUN_ID']
    branch = os.environ['GITHUB_REF_NAME']
    actor = os.environ['GITHUB_ACTOR']
    link = f"https://github.com/{repo}/actions/runs/{run_id}"

    if status == "success":
        message = f"""
✅ <b>Pipeline Succeeded!</b>

📦 <b>Repo:</b> {repo}
🔀 <b>Branch:</b> {branch}
👤 <b>Triggered by:</b> {actor}
🔗 <b>Details:</b> <a href="{link}">View Run</a>
        """
    else:
        message = f"""
❌ <b>Pipeline Failed!</b>

📦 <b>Repo:</b> {repo}
🔀 <b>Branch:</b> {branch}
👤 <b>Triggered by:</b> {actor}
🔗 <b>Details:</b> <a href="{link}">View Run</a>
        """

    send_telegram(message)

if __name__ == "__main__":
    main()
