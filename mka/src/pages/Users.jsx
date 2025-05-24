import { UserPlus, PencilLine, Trash} from "lucide-react";
import { useRef, useState } from "react";
import { useUsers } from '../hooks/useUsers';
import '../styles/users.css'

function Users (){
    const { users, loading, error } = useUsers();
    const containerRef = useRef(null);
    const [userModal, setUserModal] = useState(false)
    
    const handleScroll = (e) => {
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    }

    const handleModalUser = () => {
        console.log("modal usuario");
        setUserModal(true);
    }

    const handleAddUser = () => {

    }

    return(
        <>
            <div className="manage-users-container">
                <h2 className="title-users">Manage the users</h2>
                <div className="users-buttons-group">
                    <button className="add-user-button" onClick={handleModalUser}>
                        <UserPlus size={16} /> Add User
                    </button>
                </div>
            </div>
            <div className="scrollable-content" onScroll={handleScroll} ref={containerRef}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{color: 'red'}}>Error al cargar usuarios</p>
                ) : (
                    users.map((item) => (
                        <div className="users-container" key={item.id || item.username}>
                            <div className="name-role-container">
                                <h4>{item.name || item.username}</h4>
                                <h5>{item.role}</h5>
                            </div>
                            <div className="user-actions">
                                <button className="edit-user-button"><PencilLine size={15} />Edit</button>
                                <button className="delete-user-button"><Trash size={15}/>Delete User</button>
                            </div>
                            <hr className="line-users" />
                        </div>
                    ))
                )}
            </div>
                {userModal && (
                        <div className="user-modal">
                            <div className="user-modal-content">
                                <h3>Add new user</h3>
                                <div className="group-modal-input">
                                    <label>Username:</label>
                                    <input type="text" />
                                </div>

                                <div className="group-modal-input">
                                    <label>Role:</label>
                                    <select className="select-role">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>

                                <div className="user-modal-actions">
                                    <button className="add-user-button" onClick={() =>{handleAddUser}}>Add User</button>
                                    <button className="delete-user-button" onClick={() => setUserModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        )}       
        </>
    )
}

export default Users