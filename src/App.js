/*eslint-disable*/
import React, { Component, useState } from 'react';
import './App.css';

function App() {
  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['자바스크립트', '리액트', '뷰']);
  let [따봉, 따봉추가] = useState([0, 0, 0]);
  let [modal, setModal] = useState(true);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [날짜, 변경될날짜] = useState([
    '4월 2일 발행',
    '3월 21일 발행',
    '2월 29일 발행',
  ]);
  // 항상 변하는 값은 state로 저장해두고 사용할 일이 있을 때 {stete이름} 으로 사용하며
  // 변경 할 떄는 setState이름 의 함수를 이용하여 변경한다.
  // setState할떄 console.log보다 늦게 처리됨으로 비동기임을 알 수 있다.
  // setStete useEffact등의 hooks는 리액트에서 클로저기법의 핵심이라고 할 수 있다.

  // function 함수당() {
  //   console.log('클릭했땅');
  // }

  // destructuring
  // let [a, c] = [1, 2]

  // [1, 2, 3].map(function (a) {
  //   return 'ㅋㅋㅋ';
  // });

  return (
    <div className="container text-center mt-3">
      <div className="App">
        <div className="black-nav">
          <div>개발 blog</div>
        </div>

        {/* 
          리액트는 (vue와 달리) map, forEach 등 배열관련 함수를 사용하여
          return으로 태그를 표현하곤 한다

        */}
        {글제목.map((ele, index) => {
          return (
            <div className="list pt-3 pb-3" key={index}>
              <h4
                onClick={() => {
                  setModal(true);
                  setTitle(index);
                }}
              >
                {글제목[index]}{' '}
                <span
                  onClick={(e) => {
                    // 이벤트 버블링 막기
                    e.stopPropagation();
                    // 무언가를 추가할때 스프레드 오퍼시티를 이용해서 추가하도록하자
                    // 배열은 reference operator type이기 때문에 주소를 참조하여 램에 저장한다
                    // 값이 바뀌어도 주소는 바뀌지않기 떄문에 같은 배열을 복사하여 다른 변수에 담아서 참조주도록 하자 (다른 주소 참조 깊은 복사)
                    let likePush = [...따봉];
                    likePush[index]++;
                    따봉추가(likePush);
                  }}
                >
                  👍
                </span>
                {따봉[index]}
              </h4>
              <p>{날짜[index]}</p>
              <button
                className="btn btn-primary me-4"
                onClick={() => {
                  let copy = [...글제목];
                  copy[index] = '여자';
                  글제목변경(copy);
                }}
              >
                클릭시 여자
              </button>
              <button
                className="btn btn-danger "
                onClick={() => {
                  let copy = [...글제목];
                  copy.splice(index, 1);
                  글제목변경(copy);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>

      <div className="input row align-items-center">
        <input
          className="form-control col ms-4 mt-3"
          type="text"
          onInput={(e) => {
            입력값변경(e.target.value);
          }}
        ></input>
        <button
          className="btn btn-success ms-2 me-5 col-4 mt-3"
          onClick={() => {
            if (!(입력값 == '')) {
              let copy = [...글제목];
              // copy 맨처음에 유저기 입력한 글 추가
              copy.unshift(입력값);
              글제목변경(copy);

              let like = [...따봉];
              like.unshift(0);
              따봉추가(like);

              let day = [...날짜];
              let todayDate = new Date();
              let today = todayDate.getDate();
              let month = todayDate.getMonth() + 1;
              day.unshift(month + '월 ' + today + '일 발행');
              변경될날짜(day);
              // console.log(like);
            }
          }}
        >
          글추가하기
        </button>
      </div>

      {/* 모달 등 어떤 팝업요소를 추가할때는
          미리 디자인을 해놓고
          true false인 상태를 저장해둔 후에
          삼항 연산자를 이용하여 특정상태(true)일 때 보여주는 식으로 코딩하자

          props는 부모에서 자식으로만 전달이 가능하고 함수,객체,배열,문자열 등 많은 것을 보낼 수 있다
          props를 보낼때는 컴포넌트에 보낼것={보낼것} 을 적어주고
          props를 받는 자식컴포넌트 매개변수에 props를 적어준후에 props.보낼것 이라고 사용하도록 하자
      */}
      {modal == true ? (
        <Modal 글제목={글제목} title={title} setModal={setModal} />
      ) : null}

      {/* Class 기법 ! */}
      <Modal2></Modal2>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="popup ">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          props.setModal(false);
        }}
      >
        ~닫기버튼~
      </button>
    </div>
  );
}

// Class 기법 !
class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Seong Chan',
      age: 27,
      click: 0,
    };
  }
  numChangeAdd = (num) => {
    // 비구조 할당으로 변수만들기
    const { age } = this.state;
    this.setState({ age: age - num });
  };
  numChangeMinus = (num) => {
    // 비구조 할당으로 변수만들기
    const { click } = this.state;
    this.setState({ click: click + num });
  };

  render() {
    const { click } = this.state;
    return (
      <div>
        {/* <div>{this.props}</div> */}
        <div className="mt-3">안녕 나는 클래스 문법인데?</div>
        <p className="mb-0">깎은 나이 수 {click}</p>
        <p>내 나이 {this.state.age}</p>
        <button
          className="btn btn-success"
          onClick={() => {
            this.numChangeAdd(1);
            this.numChangeMinus(1);
          }}
        >
          나이깎기
        </button>
      </div>
    );
  }
}

export default App;
