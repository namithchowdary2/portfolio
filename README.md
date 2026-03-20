# Namith Chowdary — Developer Portfolio

> Full Stack Developer · B.Tech CSE @ LPU · Python · Java · ML

---

## 🚀 Quick Deploy to Vercel

1. Push this folder to a **GitHub repo**
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import that repo
3. Framework preset: **Other** (static site)
4. Root directory: `/` (leave default)
5. Click **Deploy** → done in ~30 seconds

Your live URL will be: `https://your-project-name.vercel.app`

---

## ⚙️ Setup Checklist Before Deploying

### 1. EmailJS (Contact Form)
1. Sign up at [emailjs.com](https://www.emailjs.com) (free tier = 200 emails/month)
2. Add a **Gmail service** → copy Service ID
3. Create **Template 1** — message to you:
   ```
   Variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   ```
4. Create **Template 2** — auto-reply to user:
   ```
   Variables: {{to_name}}, {{to_email}}, {{from_name}}
   ```
5. Open `script.js` → update `EMAILJS_CONFIG` at the top:
   ```js
   const EMAILJS_CONFIG = {
     PUBLIC_KEY:             'your_public_key',
     SERVICE_ID:             'your_service_id',
     TEMPLATE_ID:            'your_template_id',
     AUTO_REPLY_TEMPLATE_ID: 'your_autoreply_template_id'
   };
   ```

### 2. Spline 3D Robot
- The robot iframe is already embedded from your Spline community scene
- URL is in `index.html` inside `.spline-container`
- To change: remix any scene on [spline.design](https://spline.design) → Export → Copy Embed

### 3. Resume
- Your resume PDF is already at `assets/resume.pdf`
- To update: replace that file with a newer version (keep same filename)

### 4. Custom Domain (optional)
- In Vercel dashboard → your project → **Domains**
- Add your domain and follow DNS instructions

---

## 📁 File Structure

```
portfolio/
├── index.html        — All sections, full HTML skeleton
├── style.css         — Dark futuristic UI, all animations
├── script.js         — DOM logic, EmailJS, scroll, counters
├── data.js           — All content (edit this to update info)
├── chatbot.js        — AI chatbot, voice input, navigation
├── cursor.js         — Custom glow cursor + trail
├── scorpion.js       — Three.js 3D scorpion
├── vercel.json       — Vercel deployment + cache config
└── assets/
    ├── resume.pdf
    └── images/
        ├── profile.png
        ├── cert_oracle.png
        ├── cert_freecodecamp.png
        ├── cert_infosys1.png
        ├── cert_infosys2.png
        ├── cert_linkedin.png
        └── cert_lpu.png
```

---

## 🛠️ Local Development

Just open `index.html` in a browser — no build step needed.

For live reload, use VS Code + **Live Server** extension:
1. Install Live Server from VS Code extensions
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

---

## 🎨 Customizing Content

All content lives in **`data.js`** — edit that one file to update:
- Personal info, links, email
- Projects (add/remove/edit)
- Skills and proficiency levels
- Certifications
- Experience entries
- Chatbot knowledge base

---

## 📞 Contact

**Yedlapalli Devi Namith Chowdary**  
📧 namithchowdary143@gmail.com  
📱 +91-6304475233  
🔗 [LinkedIn](https://linkedin.com/in/yedlapallidevinamithchowdary) · [GitHub](https://github.com/namithchowdary2) · [LeetCode](https://leetcode.com/u/GKElTSRAI9/)
