import { useState, useEffect } from 'react'
import './UserReviewPage.css';
import FooterItem from '../../components/footerItem/FooterItem';
import HeaderItem from '../../components/headerItem/HeaderItem';
import ReviewUserItem from '../../components/reviewUserItem/ReviewUserItem';

function UserReviewPage() {

  const [postList, setPostList] = useState(false)
  const [data, setData] = useState({title: "", file: "", description: "", link: ""})
  
  function addNewPost(){
    setPostList(true)
  }

  function postToBlockchain(){
    console.log(data.title + " " + data.description + " " + data.link + " " );
    setPostList(false)
  }

  return (
    <div className="UserReviewPage">
      <HeaderItem/>

      <main className="content">
        <div className="sidebar-div">
          <aside className="left-sidebar">
              {/* <img src="profile-pic.jpg" alt="Foto do Perfil" className="profile-pic"> */}
              <h2>Nome do Usuário</h2>
              <p>Biografia ou descrição breve.</p>
              <a href="#">Configurações</a>
          </aside>

          {/* <aside className="left-sidebar">
              <h4>Categorias</h4>
              <ul>
                  <li><a href="#">Categoria 1</a></li>
                  <li><a href="#">Categoria 2</a></li>
                  <li><a href="#">Categoria 3</a></li>
              </ul>
              <h4>Pesquisar</h4>
              <input type="text" placeholder="Buscar..."/>
          </aside> */}
        </div>

        <div className="main-content">
          <div className="central-section">
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv="true"/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv=""/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv=""/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv="true"/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv="true"/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv="true"/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv="true"/>
              <ReviewUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste" inv="true"/>
          </div>
        </div>
      </main>

      <FooterItem/>
    </div>
  );
}

export default UserReviewPage;
