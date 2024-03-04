"use client"
import { useState, useEffect } from 'react';
import './styles/style.scss';
import { AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai';
import { IoIosRefresh } from "react-icons/io";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    fetch("http://localhost:3000/getUpToDatePasswords")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  const sortByStatus = () => {
    const data = [...users].sort((a, b) => 
      b.status.localeCompare(a.status)
    );
    setUsers(data);
  }
  const sortByLogin = () => {
    const data = [...users].sort((a, b) => 
      a.login.localeCompare(b.login)
    );
    setUsers(data);
  }

  const sortByLastUpdate = () => {
    const data = [...users].sort((a, b) => 
      a.last_update.split('.').reverse().join().localeCompare(b.last_update.split('.').reverse().join())
    );
    setUsers(data);
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <div className="card w-1/2 ">
        <div className='card-content'>
            <div className='flex items-center justify-center min-w-[100px] text-lg ml-2 h-[50px] rounded-lg'>
              <p>Актуальность паролей</p>
            </div>
            <button className='flex items-center justify-center bg-[#7bb83c] ml-5 w-[50px] border-2 h-[50px] rounded-lg cursor-pointer border-lime-600 hover:bg-lime-600' onClick={getUsers}>
              <IoIosRefresh className="h-8 text-white text-lg"/>
            </button>         
            <div className='relative flex flex-col item-center ml-auto min-w-[100px] w-[33%] h-2'>
              <button
                onClick={() => setIsOpen((prev) => !prev)} 
                className='p-2 w-full flex items-center justify-between border-2 text-white rounded-lg border-lime-600 bg-[#7bb83c] hover:bg-lime-600'
                >
                  Сортировка
                  {!isOpen ? (
                    <AiOutlineCaretDown className='h-8'/>
                  ) : (
                    <AiOutlineCaretUp className='h-8'/>
                  )}
              </button>
              {isOpen && (
                <div className='z-10 absolute top-[55px] bg-[#7bb83c] text-white flex flex-column items-start rounded-lg p-2 w-full border-2 border-lime-600'>
                  <div className='w-full cursor-pointer'>
                    <h3 className='hover:bg-lime-600 hover:rounded-lg' onClick={sortByLogin}>Логин</h3>
                    <h3 className='hover:bg-lime-600 hover:rounded-lg' onClick={sortByLastUpdate}>Последнее обновление</h3>
                    <h3 className='hover:bg-lime-600 hover:rounded-lg' onClick={sortByStatus}>Статус</h3>
                  </div>
                </div>
              )}
            </div>
            <div className='relative shadow-md w-full mt-5 max-h-[290px] overflow-x-auto overflow-y-auto rounded-lg'>
              <table className='w-full text-left rtl:text-right text-gray-500 '>
                <thead className=' bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th scope="col" className='px-6 py-3'>
                      Логин
                    </th>
                    <th scope="col" className='px-6 py-3'>
                      Последнее обновление
                    </th>
                    <th scope="col" className='px-6 py-3'>
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td className='px-6 py-3'>
                          {user.login}
                        </td>
                        <td className='px-6 py-3'>
                          {user.last_update}
                        </td>
                        <td className={user.status=='expired' ? 'px-6 py-3 text-white bg-red-500' : 'px-6 py-3 text-white bg-[#7bb83c]'}>
                          {user.status=='expired' ? 'Истёк' : 'Актуален'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>

              </table>
            </div>
        </div>
      </div>
    </div>
  );
}
