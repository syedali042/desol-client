import usePage from "hooks/usePage"
import styled from 'styled-components'
import { Form, Input, Button, message, Select } from "antd"
import Heading from "components/Heading"
import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from "react"
import { CallLogin } from "api/auth/login"

import { useHistory } from "react-router-dom"
import { Card, Avatar } from 'antd';
import axios from "axios";
const { Meta } = Card;

const { Option } = Select;
const fileTypes = ["JPG", "PNG", "GIF"];
export default function Dashboard() {
	const [isLoading, setLoading] = useState(false)
	const [isNotVerified, setNotVerified] = useState(false)
	const userEmail = useRef("")

	const { push: redirectTo } = useHistory()
	const [NumberOfImages, setNumberOfImages] = useState([]);

	const [files, setFiles] = useState([]);
	const handleChange = (index) => (file) => {
		var fils = files;
		if(!fils.includes(file)){
			fils.push(file);
			console.log(file)
		}
		setFiles(fils);
		if (typeof window !== "undefined") {
			var ImgContainer = document.getElementsByClassName('uploaded-images')[index];
			var img = document.createElement('img');
			img.src = URL.createObjectURL(file);
			img.style.width = '200px';
			img.style.height = '200px';
			ImgContainer.appendChild(img)
		}
	};
	function onChange(value) {
		var items = []
		for (let i = 0; i < value; i++) {
			items.push(NumberOfImages);
		}
		setNumberOfImages(items)
	}

	function onSearch(val) {
		console.log('search:', val);
	}
	const onFinish = async values => {
		// setLoading(true);
		console.log(values)
		const name = values.name;
		const email = values.email;
		const phoneNumber = values.phone;
		const maxNumberOfPics = NumberOfImages.length;
		const formData = new FormData();
		files.forEach((img)=>{
			console.log(img);
			formData.append("files", img);
		})
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
		formData.append('maxNumberOfPics', maxNumberOfPics);
        const postVehicle = await axios.post(`https://desol-server.herokuapp.com/task/addVehicle`, formData)
        if (postVehicle) {
			message.success('Vehicle Added To Desol-Server');
			var imgs = postVehicle.data.data;
			var images = [];
			imgs.forEach((img)=>{
				var img = `https://desol-server.herokuapp.com/uploads/task/${img}`;
				images.push(img);
			})
			const hitHook = await axios.post(`https://hook.us1.make.com/vbv61km18q7d3k7fps1psrg3qyr3643`, {
				name:name,
				email:email,
				phoneNumber:phoneNumber,
				maxNumberOfPics:maxNumberOfPics,
				picturesURLs:images
			})
            if(hitHook){
				console.log(hitHook);
			}else{
			}
			message.error('No "Access-Control-Allow-Origin" header is present on the requested resource.')
        } else {
            console.log('Error While Adding Vehicle');
        }
		// setLoading(false)
	}
	usePage("Dashboard")

	return (
		<>
			<Wrapper>
				<Form
					size='large'
					name='userLogin'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					layout={"vertical"}
					autoComplete='on'>
					<Heading style={{ textAlign: "center", marginBottom: "25px" }}>
						Add New Vehicle
					</Heading>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: "Please enter your Name",
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: "Please enter your Email",
							},
							{
								pattern:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Please enter a valid Email Address",
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						label='Phone'
						name='phone'
						rules={[
							{
								required: true,
								message: "Please enter your Phone Number",
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						label='Select No. of Images to Upload'
					>
						<Select
							showSearch
							placeholder="Select a person"
							optionFilterProp="children"
							onChange={onChange}
							onSearch={onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value="1">1</Option>
							<Option value="2">2</Option>
							<Option value="3">3</Option>
							<Option value="4">4</Option>
							<Option value="5">5</Option>
							<Option value="6">6</Option>
							<Option value="7">7</Option>
							<Option value="8">8</Option>
							<Option value="9">9</Option>
							<Option value="10">10</Option>
						</Select>
					</Form.Item>
					{NumberOfImages ? NumberOfImages.map((item, index) => (
						<div key={index}>
							<FileUploader multiple={false} handleChange={handleChange(index)} name={`file[${index}]`} types={fileTypes} />
							<div className="uploaded-images">
							</div>
						</div>
					)) : ''}

					<Form.Item>
						<Button
							loading={isLoading}
							style={{ width: "100%", marginTop: "10px" }}
							type='primary'
							htmlType='submit'>
							Sign In
						</Button>
					</Form.Item>
				</Form>
			</Wrapper>
		</>
	)
}
const WidgetWrapper = styled.div`
	margin-top:30px;
	& > .ant-row{
		height:500px !important;
	}
`
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
//   align-items: center;
  justify-content: center;

  form {
    width: 90%;
    max-width: 500px;

    label::before {
      display: none !important;
    }

    .ant-form-item-explain-error {
      margin-bottom: 12px;
    }

    .ant-form-item-label {
      padding-bottom: 3px;
      & > label {
        font-size: 16px;
      }
    }
  }
`