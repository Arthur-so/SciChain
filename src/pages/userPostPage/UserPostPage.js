import { useState, useEffect } from 'react'
import './UserPostPage.css';
import FooterItem from '../../components/footerItem/FooterItem';
import HeaderItem from '../../components/headerItem/HeaderItem';
import PostUserItem from '../../components/postUserItem/PostUserItem';

function UserPostPage() {

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
    <div className="UserPostPage">
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
              <button className="post -new" onClick={() => addNewPost()}>
                <h3>Post article</h3>
              </button>
              <article className={postList  ? 'post -input' : 'post -input -inv'}>
                <div className='container-new-post'>
                  <div>
                    <input placeholder='Title' value={data.title} type='text' onChange={e => setData({...data, title: e.target.value})}></input>
                    <input placeholder='File' value={data.file} type='file' onChange={e => setData({...data, file: e.target.value})}></input>
                  </div>
                  <div>
                    <input placeholder='Description' value={data.description} type='text' onChange={e => setData({...data, description: e.target.value})}></input>
                    <input placeholder='Link' value={data.link} type='text' onChange={e => setData({...data, link: e.target.value})}></input>
                  </div>
                  <button className="send-button" onClick={() => postToBlockchain()}>Send!</button>
                </div>
              </article>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>
              <PostUserItem title="Teste" file="File" description="Teste" visualizerLink="Teste"/>

          </div>
        </div>
      </main>

      <FooterItem/>
    </div>
  );
}

export default UserPostPage;
