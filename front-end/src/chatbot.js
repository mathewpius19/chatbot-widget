import axios from "axios";
import React, { Component } from "react";
import ReactPlayer from "react-player";

class Chatbot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: "https://dreal.in/vid/1617166459.836072.mp4",
			isHeadClicked: false,
			transitionClass:"",
			email:""
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.submitEmail = this.submitEmail.bind(this);

	}

	handleEmailChange(event){
		this.setState({email:event.target.value});
	}
	submitEmail(){
        const postData = {email:this.state.email};
		axios.post("/api/v1.0/chatbot",postData)
			.then(({data})=>{
				console.log(data);
			});
	}
	change(key) {
		switch (key) {
			case "toHosting":
				document.getElementById("overlay-intro").style.display = "none";
				document.getElementById("overlay-host").style.display = "block";
				this.setState({
					url: "https://dreal.in/vid/1617166649.9540873.mp4"
				});
				break;

			case "toMessages":
				document.getElementById("overlay-intro").style.display = "none";
				document.getElementById("overlay-email").style.display = "block";
				this.setState({
					url: "https://dreal.in/vid/1617166739.6414397.mp4"
				});
				break;

			case "submitEmail":
				this.setState({
					url: "https://dreal.in/vid/1617166819.5867388.mp4"
				});

				this.submitEmail();
				
                
				break;

			case "toCreateVideos":
				document.getElementById("overlay-intro").style.display = "none";
				document.getElementById("overlay-create-video").style.display = "block";
				this.setState({
					url: "https://dreal.in/vid/1617107689.4509332.mp4"
				});
				break;

			case "showBot":
				if (this.state.transitionClass === "") {
					document.getElementById("chathead").style.display = "none";
					this.setState({
						transitionClass: "animate",
						isHeadClicked: !this.state.isHeadClicked
					});
					this.change("resetBot");
				}
				else {
					this.setState({
						transitionClass: "",
						isHeadClicked: !this.state.isHeadClicked
					});
				}
				break;

			case "resetBot":
				document.getElementById("overlay-intro").style.display = "block";
				document.getElementById("overlay-host").style.display = "none";
				document.getElementById("overlay-email").style.display = "none";
				document.getElementById("overlay-create-video").style.display = "none";
				this.setState({
					url: "https://dreal.in/vid/1617166459.836072.mp4",
					isHeadClicked: true
				});
				break;

			case "closeBot":
				document.getElementById("chathead").style.display = "block";
				this.setState({
					transitionClass: "",
					isHeadClicked: !this.state.isHeadClicked
				});
				break;

			default:
				break;
		}
	}

	render() {
		const { url, isHeadClicked, email } = this.state;
		console.log(email);
		return (
			<div id="main">
				<div id="chat-bot" className={this.state.transitionClass}>
					<a href="#" className="close" onClick={() => { this.change("closeBot"); }}></a>
					<a className="arrow-left" onClick={() => { this.change("resetBot"); }}>Menu</a>
					<ReactPlayer
						id="video-bot"
						className="videoInsert"
						playing={isHeadClicked}
						controlsList="nodownload"
						width="320px"
						height="385px"
						
						url={url}
					/>
					<div className="overlay" >
						<div id="overlay-intro">
							<button className="btn btn-primary2" onClick={() => { this.change("toHosting"); }}>Host me on your website</button>
							<button className="btn btn-primary2" onClick={() => { this.change("toMessages"); }}>Create Personalized messages</button>
							<button className="btn btn-primary2" onClick={() => { this.change("toCreateVideos"); }}>Create videos in 40+ Languages</button>
						</div>
						<div id="overlay-host" >
							<p style={{ color: "white" }}>Yes you can have me for yourself.<br /> I mean I can be present on your website!<br />
                            I helped others increase click rates<br /> by an astounding 100%.</p>
							<button className="btn btn-primary2" onClick={() => { this.change("resetBot"); }}>Main Menu</button>
						</div>
						<div id="overlay-email">
							<p style={{ color: "white" }}>I can talk directly to anyone by their name.<br /> Enter your email address<br /> and let me show you.</p>
							<iframe name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
							<form target="hiddenFrame" onSubmit={() => { this.change("submitEmail"); }}>
								<input type="email" className="form-control" id="exampleInputEmail1" value={this.state.email} onChange={this.handleEmailChange} aria-describedby="emailHelp" placeholder="Enter email"></input>
								<button type="submit" className="btn btn-primary2">Submit</button>
							</form>
						</div>
						<div id="overlay-create-video">
							<p style={{ color: "white" }}>I can speak in all languages.<br />
                            “Main bol k dikhaun?”<br />
                            “I love my customers”<br />
                            “and in different accents too”<br />
							</p>
						</div>
					</div>
				</div>
				<div id="chathead" className="chatbot-head">
					<button type="button" className="btn" onClick={() => { this.change("showBot"); }}>
						<ReactPlayer
							id="video-bot"
							className="videoInsert"
							playing
							muted
							loop={true}
							height="128px"
							width="140px"
							controlsList="nodownload"
							url="https://dreal.in/vid/1615800618.4738576.mp4"
						/>
						<div className="initial_overlay">Want to talk to AI me?</div>
					</button>
				</div>
			</div>
		);
	}
}

export default Chatbot;