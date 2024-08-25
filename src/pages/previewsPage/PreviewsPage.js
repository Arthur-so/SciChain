import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // Certifique-se de que o ABI está correto

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const PreviewsPage = () => {
  const [previews, setPreviews] = useState([]);
  const [articleId, setArticleId] = useState(""); // State para o ID do artigo
  const [amount, setAmount] = useState(""); // State para o valor

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

  const buyArticle = async () => {
    if (!window.ethereum) {
      console.log("MetaMask não detectado!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);

      const tx = await journalContract.buyArticle(articleId, { value: ethers.parseEther(amount) });
      await tx.wait(); // Aguarda a confirmação da transação
      console.log("Artigo comprado com sucesso!");
    } catch (error) {
      console.error("Erro ao comprar o artigo:", error);
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

      <h3>Comprar Artigo</h3>
      <input
        type="text"
        placeholder="ID do artigo"
        value={articleId}
        onChange={(e) => setArticleId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Valor (em ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={buyArticle}>Comprar</button>
    </div>
  );
};

export default PreviewsPage;
