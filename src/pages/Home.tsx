// src/pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Mirë se erdhe në faqen tonë!</h1>
      <Link to="/contact">
        <button>Shko te Contact Us</button>
      </Link>
    </div>
  );
}
