import React, { useState } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // O ABI gerado pelo Hardhat

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const ReviewArticlePage = () => {
  const [articleId, setArticleId] = useState("");
  const [reviewStatus, setReviewStatus] = useState("Approved"); // "Approved" ou "Rejected"

  const reviewArticle = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);
      const tx = await journalContract.reviewArticle(articleId, reviewStatus === "Approved" ? 2 : 3); // 2 para Approved, 3 para Rejected
      await tx.wait();

      console.log("Revisão do artigo submetida com sucesso!");
    } catch (error) {
      console.error("Erro ao revisar artigo:", error);
    }
  };

  return (
    <div>
      <h2>Aprovar/Rejeitar Artigo</h2>
      <form onSubmit={(e) => { e.preventDefault(); reviewArticle(); }}>
        <div>
          <label>ID do Artigo:</label>
          <input
            type="number"
            value={articleId}
            onChange={(e) => setArticleId(e.target.value)}
          />
        </div>
        <div>
          <label>Status da Revisão:</label>
          <select value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)}>
            <option value="Approved">Aprovar</option>
            <option value="Rejected">Rejeitar</option>
          </select>
        </div>
        <button type="submit">Enviar Revisão</button>
      </form>
    </div>
  );
};

export default ReviewArticlePage;
