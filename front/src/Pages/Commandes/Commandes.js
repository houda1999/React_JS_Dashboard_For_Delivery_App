import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

import axios from "axios";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Swal from 'sweetalert2';
import ViewCommand from "./viewCommand";

const Commandes = () => {
    const getUrl = 'http://localhost:1337/get_all_commandes';
    const [dataCommandes, setDataCommandes] = useState([]);
    const [searchText, setSearchText] = useState();
    const [searchedColumn, setSearchedColumn] = useState();
    const searchInput = useRef();
    const [openView1, setOpenView1] = useState(false);
    const [viewData, setViewData] = useState([]);


    const handleChoosedRow = async (row) => {

        let arrayFetch = [];
        arrayFetch.push(row);
        const editArray = await arrayFetch.map((item) => {
            if (row.livreur) {
                let element = {
                    id: row.key,
                    client: row.client,
                    livreur: row.livreur,
                    status: row.status,
                    date_commande: row.date_commande
                }
                return element;
            }
            else {
                let element = {
                    id: row.key,
                    client: row.client,
                    livreur: "null",
                    status: row.status,
                    date_commande: row.date_commande
                }
                return element;
            }

        })
        setViewData(editArray);
        setOpenView1(true);

    };




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
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            ...getColumnSearchProps('client')

        },
        {
            title: 'Livreur',
            dataIndex: 'livreur',
            key: 'livreur',
            ...getColumnSearchProps('livreur')
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status')
        },
        {
            title: 'Date',
            dataIndex: 'date_commande',
            key: 'date_commande',
            ...getColumnSearchProps('date_commande')
        },
        {
            title: 'Action',
            key: '_id',
            render: (record) => (
                <>
                    <button className="buton-delete" onClick={() => handleChoosedRow(record)}
                    >
                        <FontAwesomeIcon icon={faEye} className="action-icon" style={{ position: "unset !important" }} />
                    </button>


                </>
            )
        },

    ]
    async function getAllCommandes() {

        let response = await axios.get(getUrl).then((response) => {
            return response;
        });
        let result = await response.data;
        if (result.status == true) {
            const results = await result.dataCommandes.map((row) => {

                if (row.livreur) {
                    const date = new Date(row.date_commande.toString());
                    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
                    let element = {
                        key: row._id,
                        client: row.client.name,
                        livreur: row.livreur.name,
                        status: row.status,
                        date_commande: formattedDate
                    }
                    return element;
                }
                else {
                    const date = new Date(row.date_commande.toString());
                    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
                    let element = {
                        key: row._id,
                        client: row.client.name,
                        livreur: "None",
                        status: row.status,
                        date_commande:formattedDate
                    }
                    return element;
                }

            })
            setDataCommandes(results);

        }

    }
    useEffect(() => {
        getAllCommandes();
    }, [dataCommandes]);

    return (
        <div className="comp-livreur">

            <Table columns={columns} dataSource={dataCommandes}
                pagination={{ defaultPageSize: 4 }} />
            <ViewCommand visible2={openView1} setVisible2={setOpenView1}
                viewData={viewData} />
        </div>
    )
}

export default Commandes;