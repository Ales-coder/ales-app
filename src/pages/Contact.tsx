
import { useState } from "react";

type ContactProps = {
  direction: string;
};

export default function Contact({ direction }: ContactProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nUsername: ${username}\nMesazhi: ${message}`);
  };

  return (
    <div>
      <h2>Drejtimi i navigimit është: {direction}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Mesazhi"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Dërgo</button>
      </form>
    </div>
  );
}
