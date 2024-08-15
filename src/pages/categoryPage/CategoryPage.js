import { useParams } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage() {
    const {id} = useParams();

    return (
        <div className="CategoryPage">
            <p>Pagina da categoria: {id}</p>
        </div>
    );
}

export default CategoryPage;
