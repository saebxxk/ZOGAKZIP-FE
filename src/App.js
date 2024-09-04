import React, { useEffect, useState }from 'react';
import AppRouter from './routes/AppRouter';
import './App.css';



function App() {




  const [data, setData] = useState(null);


    useEffect(() => {
      fetch('https://zogakzip-bmoe.onrender.com', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        setData(data); // 받은 데이터를 상태로 설정
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []); // 빈 배열로 두면 컴포넌트 마운트 시 한 번만 실행됨
  
  return(

    
    <div className="App">
      
      <main>
        
        <AppRouter />
      </main>
      
    
    </div>
  
  );
}


export default App;
