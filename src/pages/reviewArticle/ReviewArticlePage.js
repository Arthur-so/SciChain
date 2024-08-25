import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // O ABI gerado pelo Hardhat

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const ReviewArticlePage = () => {
  const [articleId, setArticleId] = useState("");
  const [reviewStatus, setReviewStatus] = useState("Approved");
  const [reviewerArticles, setReviewerArticles] = useState([]);

  const fetchReviewerArticles = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);

      const articles = await journalContract.getReviewerArticles();
      setReviewerArticles(articles);
    } catch (error) {
      console.error("Erro ao buscar artigos do revisor:", error);
    }
  };

   // Mapeamento de status
 const statusMapping = {
    2: "Aprovado",
    3: "Rejeitado"
  };

  useEffect(() => {
    fetchReviewerArticles();
  }, []);

  const reviewArticle = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);
      const tx = await journalContract.reviewArticle(articleId, reviewStatus === "Approved" ? 2 : 3); // 1 para Approved, 2 para Rejected
      await tx.wait();

      console.log("Revisão do artigo submetida com sucesso!");
      // Recarregar artigos após a revisão
      fetchReviewerArticles();
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

      <h3>Artigos Para Revisão</h3>
      {reviewerArticles.length > 0 ? (
        <ul>
          {reviewerArticles.map((article, index) => (
            <li key={index}>
              <strong>ID do Artigo:</strong> {article.id.toString()} <br />
              <strong>Título:</strong> {article.title} <br />
              <strong>Status:</strong> {statusMapping[article.status]}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum artigo encontrado para revisão.</p>
      )}
    </div>
  );
};

export default ReviewArticlePage;
