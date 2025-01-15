import AdminNavbar from '../components/AdminNavbar';
import AddMovieForm from '../components/AddMovieForm';
import Order from '../components/Order'
import Remove from '../components/RemoveForm';

function RemoveMovie() {

    const allMenu = {
        "Order":<Order></Order>,
        "Add Movie":<AddMovieForm></AddMovieForm>,         //Add Add Movie page
        "Remove Movie":<Remove></Remove>,   //Add Remove Movie page
        "Setting":<div>Setting page</div>              //Add Setting page
    }

    return(<div>
        <AdminNavbar allMenu={allMenu}></AdminNavbar>
        </div>);
}

export default RemoveMovie 