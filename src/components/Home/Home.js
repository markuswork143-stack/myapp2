import { useCallback, useEffect, useState } from 'react';


import ListGroup from 'react-bootstrap/ListGroup';

import { Modal, Button, Pagination } from 'react-bootstrap';

function Home() {

    const [data, setData] = useState([]);

   const [showModal, setShowModal] = useState(false);
   
  const [selectedItem, setSelectedItem] = useState({ id: null, namabarang: '' });

  const [total, setTotal] = useState(null);

  const [page, setPage] = useState(1);

  const limit = 10;
  
  const [loading, setLoading] = useState(false);

  const handleClick = (idbarang, namabarang) => {
      setSelectedItem({ idbarang, namabarang});
      setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`http://192.168.10.74:3000/api/getbahanbaku/${page}`); // Ganti URL API
  //     const json = await res.json();
  //     setData(json.data); // Atur sesuai struktur respon API kamu
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch awal saat component mount
  //   fetchData();

  //   // Set interval tiap 5 menit
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 300000); // 300.000 ms = 5 menit

  //   // Hapus interval saat komponen di-unmount
  //   return () => clearInterval(interval);
  // }, []);

const fetchData = useCallback(async () => {
  setLoading(true);
  try {
    const res = await fetch(`http://192.168.10.74:3000/api/getbahanbaku/${page}`);
    const json = await res.json();
    setData(json.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
}, [page]);  // <-- masukkan 'page' kalau fetchData tergantung 'page'

useEffect(() => {
  fetchData();

  const interval = setInterval(() => {
    fetchData();
  }, 300000);

  return () => clearInterval(interval);
}, [fetchData]);


  // const fetchData2 = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`http://192.168.10.74:3000/api/coutbarangbahanbaku`); // Ganti URL API
  //     const json = await res.json();
  //    setTotal(json.total);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch awal saat component mount
  //   fetchData2();

  //   // Set interval tiap 5 menit
  //   const interval = setInterval(() => {
  //     fetchData2();
  //   }, 300000); // 300.000 ms = 5 menit

  //   // Hapus interval saat komponen di-unmount
  //   return () => clearInterval(interval);
  // }, []);


  const fetchData2 = useCallback(async () => {
  setLoading(true);
  try {
    const res = await fetch(`http://192.168.10.74:3000/api/coutbarangbahanbaku`);
    const json = await res.json();
    setTotal(json.total);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
}, []);  // <-- masukkan 'page' kalau fetchData tergantung 'page'

useEffect(() => {
  fetchData2();

  const interval = setInterval(() => {
    fetchData2();
  }, 300000);

  return () => clearInterval(interval);
}, [fetchData2]);


const totalPages = Math.ceil(total / limit);

 const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }


  return (
      <>

      {loading ? <p>Loading...</p> : null}
  <ListGroup as="ol" numbered className="no-italic">
      {Array.isArray(data) && data.map((item) => (
        
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
          onClick={() => handleClick(item.idbarang,item.namabarang)}
      >
       
        <div className="ms-2 me-auto">
          <div className="fw-bold">Nama Barang: {item.namabarang} </div>
          <div>Jenis: {item.jenis}</div>
          <div>warna: {item.warna}</div>
          <div>Saldo: {item.jumlah}</div>
          <div>Tanggal Masuk Bahan: {item.tanggalinputstok2}</div>   
        </div>
        
      </ListGroup.Item>

      ))}
    
    </ListGroup>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {selectedItem.namabarang}<br></br>Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Detail

          <br></br>
          
          <br></br>
          
          Delete
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      <br></br>

      <Pagination >
            <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
            {paginationItems}
            <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
            <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
      </Pagination>

  </>


  );
}


export default Home;