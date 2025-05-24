import { UserPlus, PencilLine, Trash} from "lucide-react";
import { useRef, useState } from "react";
import { useUsers  } from '../hooks/useUsers';
import '../styles/users.css'

function Users (){
    const { users, loading, error, createUser, editUser, deleteUser } = useUsers();
    const containerRef = useRef(null);
    const [userModal, setUserModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', role: 'user', password: '' });
    const [editingUser, setEditingUser] = useState(null); // Renombrado para evitar conflicto
    
    const handleScroll = (e) => {
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    }

    const handleModalUser = () => {
        setUserModal(true);
    }

    const handleEditModal = (user) => {
        setEditingUser({ ...user, password: '' }); // No mostrar password
        setEditModal(true);
    }

    const handleAddUser = async () => {
        if (!newUser.username || !newUser.password) return;
        try {
            await createUser({
                name: newUser.username,
                role: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1).toLowerCase(),
                passwordHash: newUser.password,
                email: newUser.email || '',
            });
            setUserModal(false);
            setNewUser({ username: '', role: 'user', password: '', email: '' });
        } catch (err) {
            alert('Error creating user');
            console.log(err);
        }
    };

    const handleUpdateUser = async () => {
        if (!editingUser) return;
        try {
            await editUser(editingUser.id, {
                name: editingUser.name || editingUser.username,
                role: editingUser.role.charAt(0).toUpperCase() + editingUser.role.slice(1).toLowerCase(),
                passwordHash: editingUser.password || undefined, // Solo si se cambia
                email: editingUser.email || '',
            });
            setEditModal(false);
            setEditingUser(null);
        } catch (err) {
            alert('Error updating user');
            console.log(err);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteUser(userId);
        } catch (err) {
            alert('Error deleting user');
            console.log(err);
        }
    };

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
                    <p style={{color: 'red'}}>Error charging users</p>
                ) : (
                    users.map((item) => (
                        <div className="users-container" key={item.id || item.username}>
                            <div className="name-role-container">
                                <h4>{item.name || item.username}</h4>
                                <h5>{item.role}</h5>
                            </div>
                            <div className="user-actions">
                                <button className="edit-user-button" onClick={() => handleEditModal(item)}><PencilLine size={15} />Edit</button>
                                <button className="delete-user-button" onClick={() => handleDeleteUser(item.id)}><Trash size={15}/>Delete User</button>
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
                            <input type="text" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                        </div>
                        <div className="group-modal-input">
                            <label>Role:</label>
                            <select className="select-role" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="group-modal-input">
                            <label>Password:</label>
                            <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                        </div>
                        <div className="group-modal-input">
                            <label>Email:</label>
                            <input type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                        </div>
                        <div className="user-modal-actions">
                            <button className="add-user-button" onClick={handleAddUser}>Add User</button>
                            <button className="delete-user-button" onClick={() => setUserModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {editModal && editingUser && (
                <div className="user-modal">
                    <div className="user-modal-content user-modal-content--large">
                        <h3>Edit user</h3>
                        <div className="group-modal-input">
                            <label>Username:</label>
                            <input type="text" value={editingUser.name || editingUser.username} disabled />
                        </div>
                        <div className="group-modal-input">
                            <label>Role:</label>
                            <select className="select-role" value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="group-modal-input">
                            <label>Password:</label>
                            <input type="password" value={editingUser.password || ''} onChange={e => setEditingUser({ ...editingUser, password: e.target.value })} />
                            <span className="input-subtext"> <em>empty for no changes</em> </span>
                        </div>
                        <div className="group-modal-input">
                            <label>Email:</label>
                            <input type="email" value={editingUser.email || ''} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} />
                        </div>
                        <div className="user-modal-actions">
                            <button className="add-user-button" onClick={handleUpdateUser}>Save</button>
                            <button className="delete-user-button" onClick={() => { setEditModal(false); setEditingUser(null); }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Users