import { useState, useEffect } from "react";
import {
  useNavigate,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import "./App.css";
import Swal from "sweetalert2";
import error404 from "./assets/not_found.png";
import { contactcoutext } from "./context/contactContext.js";
import _ from "lodash";
import {
  crateContact,
  getAllcountacts,
  getAllGroups,
  deletecontact,
} from "./services/contactservices.js";
import {
  EditContact,
  Navar_search,
  Titel_navar,
  User_Crate, // show user
  ViewContact,
  Crate_users, // crate
} from "./Components";
import contactSchema from "./validations/contactvalidations.js";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const usenavagate = useNavigate();
  const location = useLocation();
  const [error_vali, geterror_vall] = useState();
  const [Contacts, SetContacts] = useState([]);
  const [loading, Setloading] = useState(false);
  const [Groups, SetGroups] = useState([]);
  const [filteredcontacts, Setfilteredcontacts] = useState([]);
  //   const [query, setQuery] = useState({ text: "" });
  const [Contact, setContact] = useState({});

  const notify_success = () => toast.success("ثبت نام با موفقیت انجام شد 😎");
  const notify_error = () => toast.error("ثبت نام با موفقیت انجام نشد ⚠");
  const notify_remove_succ = () => toast.success("مخاطب  با موفقیت حذف شد  ☹" , {    autoClose: 4000});
  const notify_remove_error = () => toast.error("مخاطب  با موفقیت حذف نشد  😉" , {    autoClose: 4000});

  useEffect(() => {
    const fetchData = async () => {
      try {
        Setloading(true);
        const { data: contactsData } = await getAllcountacts();
        const { data: group } = await getAllGroups();
        SetContacts(contactsData);

        Setfilteredcontacts(contactsData);
        SetGroups(group);
        Setloading(false);
      } catch (err) {
        console.log(err.message);
        Setloading(false);
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({
      ...Contact,
      [event.target.name]: event.target.value,
    });
  };
  // clear  form
  const handelFormCancel = () => {
    setContact({
      name: "",
      family: "",
      tel: "",
      groups: "",
      image: "",
      job: "",
      email: "",
    });

    usenavagate("/contacts");
  };
  // submit form
//   const createContactForm = async (e) => {
//     e.preventDefault();
//     Setloading(false)
//     try {
//       await contactSchema.validate(Contact, { abortEarly: false });

//       const response = await crateContact(Contact);
//       if (response.status === 201) {    
//         handelFormCancel();
//         geterror_vall([]);
//         Setloading(!loading);
//         usenavagate("/contacts");
//       }
//     } catch (err) {
//       notify_error();
//       console.log(err.message);
//       geterror_vall(err.inner);
//     }
//     finally{
//         Setloading(!loading);
//     }
//   };


// submit form
  const createContactForm = async (e) => {
    e.preventDefault();
    
    try {

      Setloading(true);

 
      await contactSchema.validate(Contact, { abortEarly: false });

 
      const response = await crateContact(Contact);
      
      if (response.status === 201) {    
        handelFormCancel();
        geterror_vall([]);
        
        const { data } = await getAllcountacts();
        setContact(data); 


        usenavagate("/contacts");
      }
    } catch (err) {
      notify_error();
      console.log(err.message);
      if (err.inner) {
        geterror_vall(err.inner);
      }
    } finally {

      Setloading(false);
    }
  };

  

  const confirmDelete = (contactid, contactname, contactfamily) => {
    Swal.fire({
      title: "پاک کردن مخاطب",
      text: `مطمئنی که می‌خوای ${contactname + " " + contactfamily} رو پاک کنی؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، پاک شود",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        removeContact(contactid);

        Swal.fire({
            
          title: "حذف شد!",
          text: "مخاطب با موفقیت پاک شد.",
          icon: "success",
          confirmButtonText: "باشه",
          
        });
      }
    });
  };

    const removeContact = async (contactid) => {
        try {
        Setloading(true);
        notify_remove_succ();
            
        const result = await deletecontact(contactid);
        if (result) {
            const { data: contactsData } = await getAllcountacts();
            
                setContact(contactsData);
        }
        } catch (error) {
        notify_remove_error();
        console.log(error.message);
        } finally {
            Setloading(false);
        }
    };





  let filtertimeout;

  const contactSearch = (query) => {
    const searchText = event.target.value;
    console.log("🔍 متن سرچ:", searchText);
    console.log("📋 تعداد کل:", Contacts.length);
    // setQuery({ ...query, text: searchText });

    clearTimeout(filtertimeout);

    // new version
    if (!query) return Setfilteredcontacts([...Contacts]);

    // old version
    // if (!searchText.trim()) {
    //   console.log("خالی شد، همه رو نشون بده");
    //   Setfilteredcontacts(...Contacts);
    //   return;
    // }
    filtertimeout = setTimeout(() => {
      Setfilteredcontacts(
        Contacts.filter((contact) => {
          const name = (contact.name || "").trim().toLowerCase();
          const family = (contact.family || "").trim().toLowerCase();
          const search = searchText.trim().toLowerCase();
          const match = name.includes(search) || family.includes(search);
          return match;
        }),
      );
    }, 2000);
  };

  return (
    <contactcoutext.Provider
      value={{
        loading, // لودینگ  صفحه
        Setloading,
        onContactChange, // اطلاعات دونه دونه آرایه میده
        Contact, // اطلاعات کاربر نشون میده
        Groups, // اطلاعات گروه رو نشون میده
        // query,
        Contacts, // اطلاعات کامل مخاطب  ها رو نشون میده
        filteredcontacts, // اطلاعات فیلترشده نشون میده
        createContactForm, // مخاطب رو میسازه
        handelFormCancel, // اطلاعات فرم پاک میکنه
        confirmDelete, // نمایش فرم پاک کردم مخاطب (alert)
        removeContact: { removeContact }, //مخاطب رو پاک میکنه
        contactSearch, // مخاطب رو جستجو میکنه
        error_vali,
      }}
    >
      <div
        className="flex items-center flex-col  min-h-screen w-full"
        style={{
          background:
            "linear-gradient(185deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(15, 143, 168, 1) 100%)",
        }}
      >
        <nav className=" py-4 flex flex-row justify-around  max-sm:w-full md:w-full max-lg:w-full bg-sky-700 max-[430px]:bg-red-900 ">
          {/* titel */}
          <Titel_navar />

          {/* search_bar */}
          {/* در صورتی که در صفحه دیگه باشه اطلاعات  نوار سرچ غیرفعال میشه */}
          {location.pathname === "/contacts" ? <Navar_search /> : null}
        </nav>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Navigate to={"/Contacts"} />}></Route>
          <Route path="/contacts" element={<User_Crate />}></Route>
          <Route path="/contacts/add" element={<Crate_users />}></Route>
          <Route path="/contacts/:contactid" element={<ViewContact />}></Route>
          <Route
            path="/contacts/edit/:contactid"
            element={<EditContact />}
          ></Route>
          <Route
            path="*"
            element={
              <img
                className="mt-5 rounded-4xl"
                src={error404}
                alt="not found "
              ></img>
            }
          ></Route>
        </Routes>
        <section>
          {/* <User_Crate Contacts={Contacts} load={loading}></User_Crate> */}
        </section>
      </div>
    </contactcoutext.Provider>
  );
}

export default App;
