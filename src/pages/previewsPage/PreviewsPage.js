import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // Certifique-se de que o ABI está correto

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const PreviewsPage = () => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchPreviews();
  }, []);

  const fetchPreviews = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);
      const previewsList = await journalContract.getPreviews();

      const formattedPreviews = previewsList.map((preview) => ({
        articleId: preview.articleId,
        title: preview.title,
        previewText: preview.preview,
      }));

      setPreviews(formattedPreviews);
    } catch (error) {
      console.error("Erro ao obter os previews:", error);
    }
  };

  return (
    <div>
      <h2>Previews de Artigos</h2>
      <ul>
        {previews.map((preview, index) => (
          <li key={index}>
            <h3>{preview.title}</h3>
            <p>{preview.previewText}</p>
            <small>Article ID: {preview.articleId.toString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewsPage;
