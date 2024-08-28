import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ScientificJournalABI from "../ScientificJournal.json"; // Certifique-se de que o ABI está correto
import HomeItem from "../../components/homeItem/HomeItem";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const PreviewsPage = () => {
  const items = [
    {
      Category: 'Teste1',
      description: 'Descrição do item 1',
      src: 'https://via.placeholder.com/150'
    },
    {
      Category: 'Teste2',
      description: 'Descrição do item 2',
      src: 'https://via.placeholder.com/150'
    },
    {
      Category: 'Teste3',
      description: 'Descrição do item 3',
      src: 'https://via.placeholder.com/150'
    },
    {
      Category: 'Teste4',
      description: 'Descrição do item 4',
      src: 'https://via.placeholder.com/150'
    },
    {
      Category: 'Teste5',
      description: 'Descrição do item 5',
      src: 'https://via.placeholder.com/150'
    }
  ];

  return (
    <div>
      {items.map((item, index) =>(
        <HomeItem id={index} title={item.Category} src={item.src} description={item.description}/>
      ))}
    </div>
  );
};

export default PreviewsPage;
