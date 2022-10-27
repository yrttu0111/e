const fs = require('fs').promises;
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',      // 데이터베이스 ip 주소
    port: 3306,             // 포트 번호
    user: 'jaemin',           // 접속 아이디
    password: 'ASDasd123!',    // 접속 비밀번호
    database: 'web_user',   // 데이터베이스 이름 mysql은 스키마 이름
    waitForConnections: true,  // 풀에 여유 커넥션이 없는경우 대기 할 것인지 옵션
    connectionLimit: 10,    // 커넥션풀에 미리 생성할 커넥션 개수
});

class userInfo{
    name;
    age;
    gender;
    id;
    password;

    constructor(name,age,gender,id,password ){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.id = id;
        this.password = password;
    }
};

module.exports ={
    async m_UserJoin (name,age,gender,id,password){
        
        let user_info  = new userInfo(name,age,gender,id,password);
        try {
            const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
            try {
                let overlap_id = false;
                var [find_id] = await connection.query("select id from user_info where id = ?",[id])
                console.log(find_id)
                if(find_id.length>0){
                    overlap_id = true;
                }
            
                if(overlap_id == true) {
                    return [false , "아이디가 중복됩니다."];
                }
                else{

                var [rows] = await connection.query("insert into user_info set id = ? , name = ? ,gender = ? , password = ?, age = ? ", [id,name,gender,password,age]);
                console.log(rows);
                }
                
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

        // try {
        //     // 유저 리스트 txt 파일이 있을때는 기존에 기록된 유저 정보를 읽어온다.
        //     let data = await fs.readFile('user_list.txt');
        //     // 유저 리스트 txt 파일을 배열로 변환
        //     let text_user_list = JSON.parse(data);
            // let overlap_id = false;        

        //     /**
        //      * 이곳에서 회원가입 중복 체크
        //      * 아이디가 중복 된다면 overlap_id 값을 true로 변경
        //      */
        //     for(var i= 0 ; i < text_user_list.length ; i++){
        //         if(text_user_list[i].id == id){
        //             overlap_id = true;
        //             break;
        //         }
                
        //     }
            
        //     if(overlap_id) {
        //         return [false , "아이디가 중복됩니다."];
                
        //     }
            
        //     text_user_list.push(user_info);
        //     fs.writeFile('user_list.txt',  JSON.stringify( text_user_list , null,2 ));

        // } catch (e) {

        //     // 유저 리스트 텍스트 파일이 없어서 읽을수 없을경우 catch 로 들어옴
        //     // 빈 유저 리스트 배열 생성
        //     var user_list = [];
        //     // 유저 정보 추가
        //     user_list.push(user_info);
        //     // user_list 배열을 텍스트 형태로 변환해서 user_list.txt 파일에 저장
        //     fs.writeFile('user_list.txt', JSON.stringify(user_list, null, 2));
        // }
        
        return [true , null];
    } ,

    async m_GetUserList(){
        try {
            const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
            try {
                var [rows] = await connection.query("select id, name, age, joindate from user_info order by idx"); // 
                console.log(rows);
                return rows;
                
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
    },
    async m_UserLeave (id,password){
        
        let user_info  = new userInfo(id,password);

        try {
            const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
            try {
                let overlap_id = false;
                var [find_id] = await connection.query("select id from user_info where id = ? and password = ?",[id, password])
                console.log(find_id)
                if(find_id.length>0){
                    overlap_id = true;
                }
            
                if(overlap_id == false) {
                    return [false , "아이디를 찾을 수 없습니다."];
                }
                else{

                var [rows] = await connection.query("delete from user_info where id = ? and password = ?", [id,password]);
                console.log(rows);
                }
                
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
        
        return [true , null];
    } ,
    async m_UserLogin (name, age, gender, id, password){
        
        let user_info  = new userInfo(name, age, gender, id, password);

        try {
            const connection = await pool.getConnection(async conn => conn); // 커넥션 풀에서 커넥션 가져오기
            try {
                let overlap_id = false;
                var [login_info] = await connection.query("select * from user_info where id = ? and password = ?",[id,password])
                console.log(login_info) 
                
                if(login_info.length>0){
                    overlap_id = true;
                    name = login_info[0].name
                    age = login_info[0].age
                    gender = login_info[0].gender


                }
            
                if(overlap_id == false) {
                    return [false , "로그인 실패."];
                }
                else{

            
                }
                
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
        
        return [true , null];
    }
}

