import React, { useEffect } from 'react'
import axios from 'axios';
import Head from 'next/Head'
import Image from 'next/image'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.scss'

const Home: React.FunctionComponent = () => {

	//TODO: figure out why this isn't working
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/search', { replace: true })
	}, []);

	return (
		<div className={styles.container}>
			
		</div>
	);
}

export default Home;
