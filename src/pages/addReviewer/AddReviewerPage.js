import React, { useState } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // O ABI gerado pelo Hardhat

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const AddReviewerPage = () => {
  const [reviewerAddress, setReviewerAddress] = useState("");
  const [articleId, setArticleId] = useState("");

  const addReviewer = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);
      const tx = await journalContract.defineReviewer(articleId, reviewerAddress);
      await tx.wait();

      console.log("Revisor adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar revisor:", error);
    }
  };

  return (
    <div>
      <h2>Adicionar Revisor</h2>
      <form onSubmit={(e) => { e.preventDefault(); addReviewer(); }}>
        <div>
          <label>ID do Artigo:</label>
          <input
            type="number"
            value={articleId}
            onChange={(e) => setArticleId(e.target.value)}
          />
        </div>
        <div>
          <label>Endereço do Revisor:</label>
          <input
            type="text"
            value={reviewerAddress}
            onChange={(e) => setReviewerAddress(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar Revisor</button>
      </form>
    </div>
  );
};

export default AddReviewerPage;
