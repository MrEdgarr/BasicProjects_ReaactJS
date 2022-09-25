import React, { useState, useEffect } from 'react'
import './App.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import Loading from './Loading'
// Sử dụng thư viện react-icons



//API
const url = 'https://fakestoreapi.com/products';

function App() {

  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState([]);
  const [index, setIndex] = useState(0)



  /*
    - Kết nối và lấy dữ liệu ApiJson
    - Đua dữ liệu vào mảng people
    - Sử dụng try-catch
    - Tạo hàm kiểm tra vị trí của slide
    - Sử dụng setInterval cho hàm autoSlider và clearInterval để xóa hoạt dộng trước
  */

    // Cach 1
  const fetchPeople = () => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => { setPeople(data); setLoading(false) })
      .catch(error => {
        setLoading(false)
        console.log(error);
      })
  }
  // Cach 2
  // const fetchPeople = async () => {
  //   setLoading(false);
  //   try {
  //     const response = await fetch(url);
  //     const people = await response.json();
  //     setLoading(false);
  //     setPeople(people);

  //   } catch (error) {
  //     setLoading(false)
  //     console.log(error);
  //   }
  // }


  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people])

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index])

  useEffect(() => {
    fetchPeople();
  }, [])



  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  return (
    <section className="section">
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className='section-center'>
        {
          /*
            - Duyệt phần tử mảng
            - Xác định vị trí slide cần hiển thị
          */
          people.map((person, personIndex) => {
            const { id, image, description, title, category } = person;

            let position = 'nextSlide';

            if (personIndex === index) {
              position = 'activeSlide';
            }

            if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
              position = 'lastSlide';
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={title} className='person-img' />
                <h4>{title}</h4>
                <p className='title'>{description}</p>
                <p className='text'>{category}</p>
                <FaQuoteRight className='icon' />
              </article>
            )
          })
        }
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
