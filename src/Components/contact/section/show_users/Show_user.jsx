import { React } from "react";
import { Link } from "react-router";
import Profile_User from "../profiles_user/Profile_user";
import not_found from "./image/not_found.png";
import Spiner_load from "../loadings/Loading";
import { useContext } from "react";
import { contactcoutext } from "../../../../context/contactContext";

const NewUser = ({ Contacts, confirm }) => {

    const {loading , filteredcontacts , confirmDelete} = useContext(contactcoutext)



    
    
  return (
    <>
      <section className="flex justify-center">
        <div className="continer  max-md:p-2 mt-2 md:p-4 bg-pink-500 rounded-full flex flex-row items-center">
          <span className="fa-solid fa-user"></span>
          <Link to="/contacts/add" className="font-vazir-test font-bold mr-2">
            ایجاد مخاطب
          </Link>
        </div>
      </section>

      {loading ? (
        <Spiner_load />
      ) : (
        <section className="containers flex justify-center items-center p-10 flex-wrap gap-4 m-2">
          {filteredcontacts.length > 0 ? (
            filteredcontacts.map((c) => {
              return <Profile_User key={c.id}  confirm={() => confirmDelete(c.id , c.name , c.family)} Contacts={c} />;
            })
          ) : (
            <div className="text-center py-5 bg-gray-500/50 flex items-center flex-col">
              <p className="text-orange-500 h-3 w-3/5 font-vazir-black">
                مخاطب یافت نشد...
              </p>
              <img src={not_found} alt="not found" className="mt-4 w-3/5" />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default NewUser;
