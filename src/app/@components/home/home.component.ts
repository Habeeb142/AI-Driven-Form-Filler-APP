import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startForm: boolean = false; record; inputType;
  firstNameConfirmed: boolean = false; lastNameConfirmed: boolean = false;

  user = {
    lastName: null,
    firstName: null
  }
  constructor(private domSanitizer: DomSanitizer, private http: HttpClient, private babyLoader: NgxUiLoaderService) { }

  items = [ 
    { 
      text: 'Click to fill a form',
      bgColor: '#732CA4',
      boxShadow: '0px 0px 8px rgba(115, 44, 164, 0.8)'
    },
  ]

  ngOnInit(): void { 
  }

  handleStartForm() {
    this.lastNameConfirmed = false; this.firstNameConfirmed = false;
    this.startForm = !this.startForm
  }

  startRecording(inputType) {
    $('#notify').modal('show')
    this.inputType = inputType
    inputType == 'lastName' ? this.lastNameConfirmed = false : this.firstNameConfirmed = false
    let mediaConstraints = {
      video: false,
      audio: true
    };
    window.navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream) {
    var options = {
    mimeType: "audio/wav",
    numberOfAudioChannels: 2,
    sampleRate: 45000,
    };
    
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();

    setTimeout(() => {
      this.stopRecording()
    }, 3000);
  }

  stopRecording() {
    $('#notify').modal('hide')
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob) {
    var reader = new window.FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        let base64 = reader.result; 
        this.handleProcessor(base64);
      }
    // const url = URL.createObjectURL(blob);
    // const formdata = new FormData();
    // formdata.append("wav_file", blob);
  }

  handleProcessor(text) {
    this.babyLoader.start()
    this.http.post('http://18.223.248.107/speak', {text}).subscribe(dat=>{
      this.babyLoader.stop()
      this.user[this.inputType] = dat['output']
    }, err => this.babyLoader.stop())
  }  

  errorCallback(error) {
    alert(error)
  }

  close() {
    $('#notify2').modal('hide');
    this.handleStartForm()
  }

  show() {
    $('#notify2').modal('show')
  }

}
