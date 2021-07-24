import React, { useEffect } from 'react'
import styled from 'styled-components'
import {selectUserName,selectUserPhoto, setSignOut, setUserLogin} from "../features/user/userSlice"
import { useDispatch,useSelector} from "react-redux";
import { auth, provider } from '../firebase';
import {useHistory} from "react-router-dom"

function Header() {

    const userName=useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const history=useHistory()
    const dispatch=useDispatch()
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            let user = result.user;
            dispatch(setUserLogin({
                name:user.displayName,
                email:user.email,
                photo:user.photoURL
            }))
            history.push("/")
        })
    }

    const signOut=()=>{
        auth.signOut().then(()=>{
            dispatch(setSignOut());
            history.push("/login")
        })
    }

    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name:user.displayName,
                    email:user.email,
                    photo:user.photoURL
                }))
                history.push("/")
            }
        })
    },[])
    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            { !userName ? (
                 <LoginContainer>
                     <Login onClick={signIn}>Login</Login>
                 </LoginContainer>):
            <>
               <NavMenu>
               <a href="">
                   <img src="/images/home-icon.svg" alt="" />
                   <span>HOME</span>
               </a>
               <a href="">
                   <img src="/images/search-icon.svg" alt="" />
                   <span>SEARCH</span>
               </a>
               <a href="">
                   <img src="/images/watchlist-icon.svg" alt="" />
                   <span>WATCHLIST</span>
               </a>
               <a href="">
                   <img src="/images/original-icon.svg" alt="" />
                   <span>ORIGINALS</span>
               </a>
               <a href="">
                   <img src="/images/movie-icon.svg" alt="" />
                   <span>MOVIES</span>
               </a>
               <a href="">
                   <img src="/images/series-icon.svg" alt="" />
                   <span>SERIES</span>
               </a>
             </NavMenu>  
                 <UserImg onClick={signOut} src="https://avatars.githubusercontent.com/u/50224886?v=4"/>  
                </>
            }
                   
        </Nav>
    )
}

export default Header

const Nav=styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
    position: sticky;
    top: 0;
`;

const Logo=styled.img`
    width: 80px;
`;

const NavMenu=styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    margin-left: 25px;

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        text-decoration: none;
        color: white;

        img{
            height: 20px;
        }

        span{
            font-size:13px;
            letter-spacing:1.42px;
            position: relative;

            &:after{
                content:"";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover{
            span:after{
                transform: scaleX(1);
                opacity:1;
            }
        }
    }
`;

const UserImg=styled.img`
    width: 48px;
    height: 48px;
    border-radius:50%;
    cursor:pointer;
`;

const Login =styled.div`
    border:1px solid #f9f9f9;
    padding:8px 16px;
    border-radius:4px;
    letter-spacing:1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    cursor: pointer;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color:#f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const LoginContainer=styled.div`
    flex:1;
    display: flex;
    justify-content:flex-end;
`;