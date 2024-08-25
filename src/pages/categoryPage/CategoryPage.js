import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import ScientificJournalABI from "../ScientificJournal.json"; // Certifique-se de que o caminho esteja correto

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const CategoryPage = () => {
  const { id: categoryName } = useParams(); // 'id' é o nome da rota dinâmica
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPreviews = async () => {
      if (!window.ethereum) {
        console.log("MetaMask não detectado!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const journalContract = new ethers.Contract(contractAddress, ScientificJournalABI.abi, signer);
        const category = await journalContract.getCategoryArticles(categoryName);
        setPreviews(category.previews);
      } catch (error) {
        console.error("Erro ao obter previews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPreviews();
  }, [categoryName]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Previews na Categoria: {categoryName}</h2>
      {previews.length === 0 ? (
        <p>Nenhum preview encontrado para esta categoria.</p>
      ) : (
        <ul>
          {previews.map((preview, index) => (
            <li key={index}>
              <h3>{preview.title}</h3>
              <p>{preview.preview}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
