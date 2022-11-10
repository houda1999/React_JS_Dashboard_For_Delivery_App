import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { createUseStyles } from 'react-jss';
import axios from "axios";
import { Input, Space } from 'antd';
import Swal from 'sweetalert2';
import ViewPlat from "./PopUp/ViewPlat";
import AddPlatPopUp from "./PopUp/AddPlat";
import { EditOutlined, EyeOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Pagination } from 'antd';
import { Empty } from 'antd';
import ModifyPlatPopUp from "./PopUp/EditPlat";


const { Search } = Input;
const postsPerPage = 6;

const Plats = () => {

    return (
        <div style={{ marginTop: '2em' }}>
            <CardsPlats />
        </div>
    )
}


const CardsPlats = () => {

    const { id } = useParams();
    const [nameRes, setNameRes] = useState('');
    const getUrl = 'http://localhost:1337/get_all_plats';
    const [maindata, setMainData] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [empty, setEmpty] = useState(false);
    const [number, setNumber] = useState(1);
    const [openViewRes, setOpenViewRes] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [editData, setEditData] = useState([]);
    const [openAddRes, setOpenAddRes] = useState(false);
    const [openEditRes, setOpenEditRes] = useState(false);

    const handlePage = (pageNumber) => setNumber(pageNumber);


    async function AddRestaurant(e) {
        e.preventDefault();

        setOpenAddRes(true);
    }

    const DeleteChoosedRow = async (row) => {
        let id = row.key;

        axios.post(`http://localhost:1337/delete_plat`, { id })
            .then(res => {
                if (res.data.deleted == true) {

                    Swal.fire({
                        timer: 3000,
                        text: "Plat supprime avec success",
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
    const ViewChoosedRow = async (row) => {
        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray = await arrayFetch.map(item => ({
            id:row.key,
            name: row.name,
            price: row.price,
            categorie: row.categorie,
            photo: row.photo,
            restaurant: row.restaurant
        }))
        setViewData(editArray);
        setOpenViewRes(true);
    }
    const EditChoosedRow = async (row) => {
        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray = await arrayFetch.map(item => ({
            id: row.key,
            name: row.name,
            price: row.price,
            categorie: row.categorie_id,
            photo: row.photo,
        }))
        setEditData(editArray);
        setOpenEditRes(true);
    }

    async function getAllPlats() {

        let restaurant = id;
        let response = await axios.get(getUrl, {
            params: {
                restaurant: restaurant
            }
        }
        ).then((response) => {
            return response;
        });
        let result = await response.data;
        if (result.status == true) {

            const results = await result.dataPlats.map(row => ({
                key: row._id,
                name: row.name,
                price: row.price,
                categorie: row.categorie.name,
                categorie_id :  row.categorie._id,
                photo: row.photo,
                restaurant: row.restaurant.name
            }))
            setNameRes(results[0].restaurant);
            setData(results);

        }

    }

    useEffect(() => {
        getAllPlats();
        if (maindata.length == 0 && !empty) {
            setMainData(data);
        }

    }, [data]);

    const AddNewItem = (item) => {
        let temp = [...maindata]
        temp.push(item)
        setMainData(temp)
    }


    const handleChange = (value) => {
        onSearch(value);
        setSearch(value);
    }

    const onSearch = (value) => {
        const lowerCaseValue = value.toLowerCase().trim();
        if (!lowerCaseValue) {
            setMainData(data);
        }
        else {
            const filterSearch = data.filter((item) => {
                return Object.keys(item).some((key) => {

                    return item['name'].toString().toLowerCase().includes(lowerCaseValue)
                        || item['price'].toString().toLowerCase().includes(lowerCaseValue)
                        || item['categorie'].toString().toLowerCase().includes(lowerCaseValue);

                });
            });
            setNumber(1);
            if (filterSearch.length != 0) {
                setMainData(filterSearch);
            }
            else {
                setEmpty(true);
                setMainData([]);
            }

        }
    };

    const UpdateItem = (row) => {
        const newList = maindata.map((item) => {

            if (item.key === row.key) {
                const updatedItem = {
                    key: row.key,
                    name: row.name,
                    price: row.price,
                    categorie: row.categorie,
                    photo: row.photo,
                };

                return updatedItem;
            }

            return item;
        });

        setMainData(newList);
    }



    let newData = maindata.slice((number - 1) * postsPerPage, postsPerPage * number);

    return (
        <div>
            <div style={{ width: '100%' }}>
                <div className='main_container'>
                    <div className="row">
                        <div className="col-md-4">
                            <Search
                                style={{ marginLeft: '1em', marginTop: '1em' }}
                                enterButton={
                                    <FontAwesomeIcon icon={faSearch} />
                                }
                                size='large'
                                placeholder='Search Restaurant'
                                className='search_bar'
                                onSearch={onSearch}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </div>
                        <div className="col-md-8 add-livreur" style={{ marginTop: '1em', paddingRight: '2.5em' }}>
                            <button className="btn btn-warning add-btn" onClick={AddRestaurant} >Ajouter</button>
                        </div>
                    </div>
                </div>


                {/* for showing cards data */}
                {newData.length ? (
                    newData.map((item) => {
                        return (
                            <div key={item.key}
                                style={{ width: '30%', height: '400px', display: "inline-block", margin: '1em' }}>
                                <Card
                                    style={{ height: '50%' }}
                                    bodyStyle={{ height: "90%", backgroundColor: "#fff" }}
                                    cover={
                                        <div style={{ overflow: "hidden", height: "200px", width: "100%" }}>
                                            <img style={{ height: '100%', width: "100%" }}
                                                alt="example"
                                                src={item.photo}
                                            />
                                        </div>
                                    }

                                    key={item.key + '1'}
                                    actions={[
                                        <EyeOutlined key="eye" onClick={() => ViewChoosedRow(item)} />,
                                        <EditOutlined key="edit" onClick={() => EditChoosedRow(item)} />,
                                        <DeleteOutlined key="delete" onClick={() => DeleteChoosedRow(item)} />,
                                    ]}>

                                    <div style={{ width: "100%", height: '40%', backgroundColor: "#fff" }}>
                                        <h4 style={{ maxLines: '2', height: "60px", width: '100%' }}>
                                            {item.name}</h4>
                                        <div style={{ marginBottom: '1em' }}>
                                            <span style={{ color: "#ffca2c", fontWeight: 'bold', fontSize: '15px' }}>
                                                Categorie :
                                            </span>
                                            <span style={{ fontSize: '15px' }}>
                                                {" " + item.categorie}
                                            </span>
                                        </div>
                                        <div >
                                            <span style={{ color: "#ffca2c", fontWeight: 'bold', fontSize: '15px' }}>
                                                Price :
                                            </span>
                                            <span style={{ fontSize: '15px' }}>
                                                {" " + item.price + " DH"}
                                            </span>
                                        </div>
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
            </div >
            <ViewPlat visible={openViewRes} setVisible={setOpenViewRes}
                viewData={viewData} />
            <AddPlatPopUp visible2={openAddRes} setVisible2={setOpenAddRes} idRes={id} nameRes={nameRes}
                modifyData={AddNewItem} />
            <ModifyPlatPopUp visible3={openEditRes} setVisible3={setOpenEditRes} modifyData = {UpdateItem}
            dataPlat={editData} />
        </div >
    );

}
export default Plats;