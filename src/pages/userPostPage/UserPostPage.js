import React, { useState } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // O ABI gerado pelo Hardhat

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const UserPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");

  const submitArticle = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);
      const tx = await journalContract.submitArticle(title, content, preview, category);
      await tx.wait();

      console.log("Artigo submetido com sucesso!");
    } catch (error) {
      console.error("Erro ao submeter artigo:", error);
    }
  };

  return (
    <div>
      <h2>Submeter Artigo</h2>
      <form onSubmit={(e) => { e.preventDefault(); submitArticle(); }}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <label>Preview:</label>
          <input type="text" value={preview} onChange={(e) => setPreview(e.target.value)} />
        </div>
        <div>
          <label>Categoria:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Submeter Artigo</button>
      </form>
    </div>
  );
};

export default UserPostPage;
