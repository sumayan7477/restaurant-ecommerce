import UseAuth from "../../../Hooks/UseAuth";

const UserHome = () => {
    const {user}= UseAuth();
    return (
        <div>
             <h2 className=" uppercase text-xl">Hi welcome {
                user?.displayName ? user.displayName:'Back'
            }</h2>
            
        </div>
    );
};

export default UserHome;