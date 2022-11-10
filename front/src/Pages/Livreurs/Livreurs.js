import { useEffect, useState, useRef } from "react";
import './livreur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import AddLivreurPopUp from "./AddLivreur/AddPopUp";
import EditLivreur from "./EditLivreur/PopUpEdit";
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Swal from 'sweetalert2';

const Livreurs = (props) => {
    const getUrl = 'http://localhost:1337/get_all_livreurs';
    const [visible2, setVisible2] = useState(false);
    const [dataLivreurs, setDataLivreurs] = useState([]);
    const [searchText, setSearchText] = useState();
    const [searchedColumn, setSearchedColumn] = useState();
    const searchInput = useRef();
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState([]);


    async function AddLivreur(event) {
        event.preventDefault();
        setVisible2(true);

    }

    const handleChoosedRow = async(row) => {
        if(!row.city)
        {
            row.city = "empty";
        }
        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray= await arrayFetch.map(item => ({ 
            fullname: item.name,
            username: item.username,
            city: item.city ,
            cin: item.cin
          }))
          setEditData(editArray);
          setOpenEdit(true);
    };

    const DeleteChoosedRow = async(row) =>{
        let cin = row.cin;
        axios.post(`http://localhost:1337/delete_livreur`, { cin })
        .then(res => {
            if (res.data.deleted == true) {
                Swal.fire({
                    timer: 3000,
                    text: "Livreur supprime avec success",
                    type: 'success',
                })
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


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };


    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });

                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)

                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });




    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name')

        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username')
        },
        {
            title: 'Cin',
            dataIndex: 'cin',
            key: 'cin',
            ...getColumnSearchProps('cin')
        },
        {
            title: 'Action',
            key: '_id',
            render: (record) => (
                <>
                    <button className="buton-delete" onClick={() => handleChoosedRow(record)}
                    >
                        <FontAwesomeIcon icon={faPencilAlt} className="action-icon" />
                    </button>
                    <button className="buton-delete" onClick={() => DeleteChoosedRow(record)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="action-icon" />
                    </button>

                </>
            )
        },

    ]
    async function getAllLivreurs() {

        let response = await axios.get(getUrl).then((response) => {
            return response;
        });
        let result = await response.data;
        
    
        if (result.status == true) {
            const results= await result.dataLivreurs.map(row => ({
                key: row._id, 
                name: row.name,
                username: row.username,
                city: row.city,
                cin: row.cin
              }))
              setDataLivreurs(results);
            
        }

    }
    useEffect(() => {
           getAllLivreurs();
    }, [dataLivreurs]);

    async function RefreshTable(event) {
        event.preventDefault();
        getAllLivreurs();

    }

    return (
        <div className="comp-livreur">
            <div className="row bar-top">

                <div className="col-md-12 add-livreur">
                    <button className="btn btn-success add-btn" onClick={AddLivreur}>Ajouter</button>
                    <button className="btn btn-danger" onClick={RefreshTable}>Refresh</button>
                </div>

                <Table columns={columns} dataSource={dataLivreurs}
                 pagination={{ defaultPageSize: 4}} />
                <AddLivreurPopUp visible2={visible2} setVisible2={setVisible2} />
                <EditLivreur visible1={openEdit} setVisible1={setOpenEdit}
                    editData={editData} />
            </div>
        </div>
    )
}

export default Livreurs;