import React , {useState, useEffect} from "react"
import TextField from '@material-ui/core/TextField';
import DataTable, {memoize} from "react-data-table-component";
import { GET, DELETE } from "../api/caller";
import { USER_ENDPOINT } from "../api/endpoint";
import {Button} from 'shards-react'




function Home () {
    const [data, setData] = useState([{title: "abc",director:'abc',year:'1198',},]);
    const columns = memoize( clickHandler => [
      {
        name: 'Username',
        selector: 'username',
        sortable: true,
      },
      {
        name: 'Fullname',
        selector: 'fullname',
        sortable: true,
      },
      {
        name: 'Phone',
        selector: 'phone',
        sortable: true,
      },
      {
        name: 'Address',
        selector: 'address',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
      },
      {
        cell:(row) => <button onClick={clickHandler} id={row.ID}>Action</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ])
    const [filterText, setFilterText] = useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);

    const filterData = data.filter(item => item.username && item.username.toLowerCase().includes(filterText.toLowerCase()));

    const getWorkerData = async () => {
      await GET(USER_ENDPOINT, {role: "worker"},{}).then((res) => {
        setData(res);
      }) 
    }

    const handleDelete = async () => {
      let url = USER_ENDPOINT + '/';
      selectedRows.forEach(item => {
        console.log(item.id)
        url = url.concat(item.id+',')
      })
      await DELETE(url, {}, {}).then(
        async () => {
          getWorkerData()
        }
      )
    }

    const handleSlectedRows = React.useCallback((state) => {
      setSelectedRows(state.selectedRows);
    })

    useEffect(() => {
      getWorkerData();
      console.log('abc')
      
    }, [filterText]);

    return (
      <div>
        <DataTable
          title="Worker Account Manager"
          columns={columns}
          data={filterData}
          defaultSortField="title"
          selectableRows={true}
          selectableRowsNoSelectAll={true}
          selectableRowsHighlight={true}
          pagination={true}
          subHeader={true}
          contextActions={(
            <Button theme='danger' onClick={handleDelete}>Delete</Button>
          )}
          onSelectedRowsChange={handleSlectedRows}
          subHeaderComponent={
            (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField id="outlined-basic" label="Search" 
                  variant="outlined" size="small" 
                  style={{ margin: '5px' }} 
                  value={filterText}
                  onChange={(e) => {
                      setFilterText(e.target.value); 
                    }
                  }
                  />
              </div>
            )
          }
          subHeaderAlign={'left'}
          fixedHeader={false}
          fixedHeaderScrollHeight="300px"
          direction={'auto'}
        />
      </div>
    );
}

export default Home;
