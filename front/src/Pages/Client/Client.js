import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Swal from 'sweetalert2';
import ViewClient from "./PopUp/ViewClient";

const Clients = () => {
    const getUrl = 'http://localhost:1337/get_all_clients';
    const [dataClients, setDataClients] = useState([]);
    const [searchText, setSearchText] = useState();
    const [searchedColumn, setSearchedColumn] = useState();
    const searchInput = useRef();
    const [openView1, setOpenView1] = useState(false);
    const [viewData, setViewData] = useState([]);


    const handleChoosedRow = async (row) => {

        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray = await arrayFetch.map(item => ({
            name: row.name,
            email: row.email,
            city: row.city,
          
        }))
        setViewData(editArray);
        setOpenView1(true);
     
    };

    const DeleteChoosedRow = async (row) => {
        let email = row.email;
        axios.post(`http://localhost:1337/delete_client`, { email })
        .then(res => {
            if (res.data.deleted == true) {
                Swal.fire({
                    timer: 3000,
                    text: "Client supprime avec success",
                    type: 'success'
                })
            }
            else if (res.data.deleted == false) {
                Swal.fire({
                    timer: 3000,
                    text: "Problem in connexion please retry",
                    type: 'error'
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
       
        {
            title: 'Action',
            key: '_id',
            render: (record) => (
                <>
                    <button className="buton-delete" onClick={() => handleChoosedRow(record)}
                    >
                        <FontAwesomeIcon icon={faEye} className="action-icon" />
                    </button>
                    <button className="buton-delete" onClick={() => DeleteChoosedRow(record)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="action-icon" />
                    </button>

                </>
            )
        },

    ]
    async function getAllClients() {

        let response = await axios.get(getUrl).then((response) => {
            return response;
        });
        let result = await response.data;
        if (result.status == true) {
            const results = await result.dataClients.map(row => ({
                key: row._id,
                name: row.name,
                email: row.email,
                city: row.city,
            }))
            setDataClients(results);

        }

    }
    useEffect(() => {
        getAllClients();
    }, [dataClients]);

    return (
        <div className="comp-livreur">

            <Table columns={columns} dataSource={dataClients}
                pagination={{ defaultPageSize: 4}} />
            <ViewClient visible2={openView1} setVisible2={setOpenView1}
                viewData={viewData} />
        </div>
    )
}

export default Clients;