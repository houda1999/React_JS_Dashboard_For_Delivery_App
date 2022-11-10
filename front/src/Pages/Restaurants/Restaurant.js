import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { createUseStyles } from 'react-jss';
import axios from "axios";
import {Input, Space} from 'antd';
import Swal from 'sweetalert2';
import ViewRestaurant from "./PopUp/ViewRes";
import AddRestaurantPopUp from "./PopUp/AddRes";
import  ModifyRestaurantPopUp from './PopUp/ModifyRes';
import { EditOutlined, EyeOutlined, SettingOutlined ,DeleteOutlined} from '@ant-design/icons';
import { Card, Pagination } from 'antd';
import { Empty } from 'antd';
import './Restaurant.css';


const { Search } = Input;
const postsPerPage = 6;

const Restaurants = () => {

    return (
        <div style={{marginTop:'2em'}}>
                <CardsRestaurants />            
        </div>
    )
}


const CardsRestaurants = () => {

    const navigate = useHistory();
    const getUrl = 'http://localhost:1337/get_all_restaurants';
    const [maindata, setMainData] = useState([]);
    const [data,setData] = useState([]);
    const [search, setSearch] = useState('');
    const [empty,setEmpty] = useState(false);
    const [number, setNumber] = useState(1);
    const [openViewRes, setOpenViewRes] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [editData, setEditData] = useState([]);
    const [openAddRes, setOpenAddRes] = useState(false);
    const [openEditRes,setOpenEditRes] = useState(false);

    const handlePage = (pageNumber) => setNumber(pageNumber);


    async function AddRestaurant(e) {
        e.preventDefault();
        setOpenAddRes(true);
    }

    const DeleteChoosedRow = async (row) => {
        let id = row.key;
        axios.post(`http://localhost:1337/delete_restaurant`, { id })
        .then(res => {
            if (res.data.deleted == true) {
                getAllRestaurants();
                setMainData(data);
                Swal.fire({
                    timer: 3000,
                    text: "Restaurant supprime avec success",
                    type: 'success',
                })
         
            let temp = [...maindata]
            const newList = temp.filter((item) => item.key !== row.key);
            setMainData(newList)
            }
            else if (res.data.deleted == false) {
                Swal.fire({
                    timer: 3000,
                    text: "Problem in connexion please retry",
                    type: 'error',
                })
            }
            
        })
    }
    const SeePlats = async (item) => {
        navigate.push(`/plats/${item}`);
    }
    const ViewChoosedRow = async (row) => {
        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray = await arrayFetch.map(item => ({
            name: row.name,
            adresse: row.adresse,
            tele: row.tele,
            photo: row.photo,
            city: row.city
        }))
        setViewData(editArray);
        setOpenViewRes(true);
    }
    const EditChoosedRow = async (row) => {
        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray = await arrayFetch.map(item => ({
            id : row.key,
            name: row.name,
            adresse: row.adresse,
            tele: row.tele,
            photo: row.photo,
            city: row.city
        }))
        setEditData(editArray);
        setOpenEditRes(true);
    }

    async function getAllRestaurants() {

        let response = await axios.get(getUrl).then((response) => {
            return response;
        });
        let result = await response.data;
        if (result.status == true) {
           
            const results = await result.dataRestaurants.map(row => ({
                key: row._id,
                name: row.name,
                adresse: row.adresse,
                tele: row.tele,
                photo: row.photo,
                city: row.city
            }))
            setData(results);

        }

    }
    useEffect(() => {
        getAllRestaurants();
        if(maindata.length == 0 && !empty)
        {
            setMainData(data);
        }
       
    }, [maindata,data]);

    const AddNewItem = (item)=>
    {
        let temp = [...maindata]
        temp.push(item)
        setMainData(temp)
    }
    const UpdateItem = (row) =>
    {
        const newList = maindata.map((item) => {
       
            if (item.key === row.key) {
              const updatedItem = {
                key: row.key,
                name: row.name,
                adresse: row.adresse,
                tele: row.tele,
                photo: row.photo,
                city: row.city
              };
              
              return updatedItem;
            }
      
            return item;
          });
      
          setMainData(newList);
    }

  
    const handleChange = (value) => {
        onSearch(value);
        setSearch(value);}

    const onSearch = (value) => {
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
            setMainData(data);
        } 
        else {
            const filterSearch = data.filter((item) => {
                return Object.keys(item).some((key) => {
                    
                    return item['name'].toString().toLowerCase().includes(lowerCaseValue) 
                    || item['adresse'].toString().toLowerCase().includes(lowerCaseValue) 
                    || item['city'].toString().toLowerCase().includes(lowerCaseValue) 
                    || item['tele'].toString().toLowerCase().includes(lowerCaseValue) ;
                });
            });
            setNumber(1);
            if(filterSearch.length != 0)
            {
                setMainData(filterSearch);
            }
            else{
                setEmpty(true);
                setMainData([]);
            }
           
        }  
    };





    let newData = maindata.slice((number - 1) * postsPerPage, postsPerPage * number);

    return (
        <div>
            <div style={{ width: '100%' }}>
                <div className='main_container'>
                    <div className="row">
                        <div className="col-md-4">
                        <Search 
                            style={{marginLeft:'1em',marginTop:'1em'}}
                            enterButton={
                                <FontAwesomeIcon icon={faSearch}/>
                            }
                            size='large'
                            placeholder='Search Restaurant'
                            className='search_bar'
                            onSearch={onSearch}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        </div>
                        <div className="col-md-8 add-livreur" style={{marginTop:'1em',paddingRight:'2.5em'}}>
                    <button className="btn btn-warning add-btn" onClick={AddRestaurant} >Ajouter</button>
                </div>
                    </div>
                </div>
        

                {/* for showing cards data */}
                {newData.length ? (
                    newData.map((item) => {
                        return (
                            <div key={item.key} className='carrd' 
                            style={{width: '30%',height:'100%', display: "inline-block",margin:'1em'}}>
                                <Card
                                    style={{ height: '100%'}}
                                    bodyStyle={{ height: "100%" }}
                                    cover = {
                                        <div style={{ overflow: "hidden", height: "200px",width:"100%" }}>
                                            <img style={{height:'100%',width:"100%"}} 
                                            alt="example"
                                            src={item.photo}
                                        />
                                        </div>        
                                    }

                                    key={item.key}
                                    actions={[
                                        <EyeOutlined key="eye" onClick={()=>ViewChoosedRow(item)}/>,
                                        <EditOutlined key="edit" onClick={()=>EditChoosedRow(item)}/>,
                                        <DeleteOutlined key="delete" onClick={()=>DeleteChoosedRow(item)}/>,
                                    ]}>
                            
                                    <div style={{ whiteSpace:'nowrap',width:"100%",height:'100%' }}>
                                        <h4>{item.name}</h4>
                                        <p>{item.adresse}</p>
                                        <p>{item.city}</p>
                                        <p>{item.tele}</p>
                                        <p><a className="see-plats" onClick={()=>SeePlats(item.key)}>Voir plats</a></p>
                                    </div>
                                </Card>
                            </div>
                        );
                    })
                ) : (
                    <div className='empty_container' >
                        <div>
                            <Empty description={false} className='empty_data'>
                                No Product Found
                            </Empty>
                        </div>
                    </div>
                )}
                <div className='pagination'>
                    {!!maindata.length && (
                        <Space>
                            <Pagination
                                defaultCurrent={number}
                                pageSize={postsPerPage}
                                total={maindata.length}
                                onChange={handlePage}
                            />
                        </Space>
                    )}
                </div>
            </div>
            <ViewRestaurant visible={openViewRes} setVisible={setOpenViewRes}
                    viewData={viewData} />
            <AddRestaurantPopUp visible2={openAddRes} setVisible2={setOpenAddRes} modifyData = {AddNewItem}/>
            <ModifyRestaurantPopUp visible3={openEditRes} setVisible3={setOpenEditRes} modifyData = {UpdateItem}
             dataRes={editData}/>
        </div>
    );

}
export default Restaurants;