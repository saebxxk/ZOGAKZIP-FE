import React from 'react';
import { Link } from 'react-router-dom';
import not from '../assets/icons/Not.svg';

const styles = {
    notFound: {
        display: 'flex',
        flexDirection: 'column', // 세로 방향으로 배치
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        height: '100vh', // 전체 화면 높이
        textAlign: 'center', // 텍스트 중앙 정렬
    },
    notImage: {
        maxWidth: '100%', // 이미지의 최대 너비를 부모 요소의 너비로 제한
        height: 'auto', // 이미지의 높이는 자동 조정
    },
    notMessage: {
        marginTop: '20px', // 이미지와 텍스트 사이에 여백 
    },
    notTitle: {
        fontSize: '18px', 
        marginBottom: '10px', // 제목과 설명 사이에 여백 
    },
    notDescription: {
        fontSize: '14px', 
    }
};

function Not() {
    return (
        <div style={styles.notFound}>
            <Link to='/'>
                <img src={not} alt="404" style={styles.notImage} />
            </Link>
            <div style={styles.notMessage}>
                <h1 style={styles.notTitle}>찾을 수 없는 페이지입니다</h1>
                <p style={styles.notDescription}>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
            </div>
        </div>
    );
}

export default Not