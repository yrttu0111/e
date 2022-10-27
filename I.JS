const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',      // 데이터베이스 ip 주소
    port: 3306,             // 포트 번호
    user: 'test',           // 접속 아이디
    password: 'test12!',    // 접속 비밀번호
    database: 'web_user',   // 데이터베이스 이름 mysql은 스키마 이름
    waitForConnections: true,  // 풀에 여유 커넥션이 없는경우 대기 할 것인지 옵션
    connectionLimit: 10,    // 커넥션풀에 미리 생성할 커넥션 개수
});

async function UserSearchQuery(){

    try {
        const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
        try {
            var [rows] = await connection.query("select * from user_info ", ""); // 
            console.log(rows);
            
        } catch (err) {
            console.log(err);
            console.log('Query Error');
        } finally {
            connection.release();
            console.log("릴리즈 했다.");
        }

    } catch (err) {
        console.log(err);
    }
}

async function UserJoinQuery(id,name,gender,brithday){

    try {
        const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
        try {
            var [rows] = await connection.query("insert into user_info set id = ? , name = ? ,gender = ? ,brithday = ? ", [id,name,gender,brithday]);
            console.log(rows);
            
        } catch (err) {
            console.log(err);
            console.log('Query Error');
        } finally {
            connection.release();
            console.log("릴리즈 했다.");
        }
    } catch (err) {
        console.log(err);
    }
}

async function UserGenderUpdate(id,gender){

    try {
        const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
        try {
            var [rows] = await connection.query("UPDATE user_info SET gender = ? where id = ? ", [gender ,id]);
            console.log(rows);
            
        } catch (err) {
            console.log(err);
            console.log('Query Error');
        } finally {
            connection.release();
            console.log("릴리즈 했다.");
        }
    } catch (err) {
        console.log(err);
    }
}

async function UserDelete(id){
    try {
        const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
        try {
            var [rows] = await connection.query("DELETE from user_info where id = ? ", [id]);
            console.log(rows);
            
        } catch (err) {
            console.log(err);
            console.log('Query Error');
        } finally {
            connection.release();
            console.log("릴리즈 했다.");
        }
    } catch (err) {
        console.log(err);
    }
}



// UserJoinQuery("fire","길동","남","2022-10-18");
UserSearchQuery();
// UserGenderUpdate("fire","여");
// UserDelete("toy@toy.com");

