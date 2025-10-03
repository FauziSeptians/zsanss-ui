**📦 ZSANSS-UI**

Reusable UI components built with React + Tailwind CSS

ZSANSS-UI adalah kumpulan komponen UI yang reusable, ringan, dan mudah dikustomisasi. Dibangun dengan React dan Tailwind CSS, library ini ditujukan untuk mempercepat proses development tanpa mengorbankan fleksibilitas desain.

✨ Features

⚡ Fast & Lightweight – Komponen siap pakai tanpa overhead berlebihan

🎨 Tailwind-powered – Mudah dikustomisasi dengan utility classes

🧩 Composable – Komponen modular yang bisa digabung sesuai kebutuhan

🔒 TypeScript Support – Autocompletion & type safety bawaan

📥 Installation

npm install zsanss-ui
# atau
yarn add zsanss-ui

Pastikan kamu sudah meng-setup Tailwind CSS di project React kamu.

🚀 Usage

Contoh penggunaan komponen:

import { Button, Card, Typography } from "zsanss-ui";

export default function App() {
  return (
    <div className="p-6">
      <Typography.Title>Welcome to ZSANSS-UI</Typography.Title>
      <Card className="mt-4 p-4">
        <Typography.Text>Ini contoh card dengan button:</Typography.Text>
        <Button variant="primary" className="mt-2">
          Click Me
        </Button>
      </Card>
    </div>
  );
}

📚 Available Components

Typography → Title, Text

Layout → Sidebar, Layout

Card → Card, Description

Image → Image

Button → Button dengan state isDisable, isProcessing, dan variant

⚙️ Props Example (Button)

type ButtonTypes = {
  children: React.ReactNode;
  className?: string;
  isDisable?: boolean;
  isProcessing?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant: "primary" | "secondary";
};

🛠 Development

Clone repo dan jalankan:

git clone https://github.com/username/zsanss-ui.git
cd zsanss-ui
npm install
npm run dev

Build library:

npm run build

🤝 Contributing

Kontribusi sangat terbuka!

Fork repo ini

Buat branch baru (git checkout -b feature/awesome-component)

Commit perubahan (git commit -m "Add awesome component")

Push ke branch (git push origin feature/awesome-component)

Buat Pull Request 🎉

📜 License

MIT © 2025 — Developed with ❤️ by Fauziseptians
