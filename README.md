มาจาก
https://www.youtube.com/watch?v=UPv-3SYRdZk
เริ่มที่ นาที 30
เมื่อเรียกใช้คลาส จะเรียกคำสั่งต่างๆ ดังนี้
Initial Mounting Process
1. constructor() ปกติ เราสร้าง  state ของคลาสตรงนี้
2. getDerivedStateFromProps() กรณี่ที่เรารับ props มา เราเอา props มาสร้างเป็น state ได้ตรงนี้
3. render() จะทำการแสดงผลทางหน้าจอ เราเรียกว่า component mount
4. componentDidMount() จะเรียกใช้งานเมื่อทำการแสดงผลทางหน้าจอแล้ว
จบ แค่นี้ ปกติ ถ้าไม่มีการเปลี่ยนแปลง state

ถ้ามีการเปลี่ยนแปลง state ใน คลาสโดยวิธีการใดๆ แล้วแต่ (กดปุ่ม, load...) จะเรียกคำสั่งต่างๆ ดังนี้
Update State and Component
1. shouldComponentUpdate() เพื่อสอบถามว่าต้องการอัพเดต component มั้ย
2. render() ถ้าเราไม่แก้ไขอะไรในข้อ 1 ก็จะทำการ แสดงผลอีกครั้ง (คราวนี้แสดงตาม state ใหม่)
3. getSnapshotBeforeUpdate() <- ไม่เคยใช้
4. componentDidUpdate()  จะทำเมื่อทำการ update component แล้ว 

ถ้าเราออกจาก คลาส นี้ไป (ออกจาก หน้า เพจนี้)
1. componentWillUnmount() 

/////////////////////////////////////////
ในตัวอย่างนี้ที่ class Discussion เราต้องการแสดงผลนาฬิกาที่หน้าจอ ให้เป็นแบบ real time ทุกวินาที

เราใช้คำสั่งใน 
componentdidmount()
 ใช้คำสั่งจับเวลา this.livetime=setInterval(()=>{},1000) คือให้ทำงานจับเวลาทุกๆ  1วินาที ให้ ทำการ setState ใหม่
 ค่า currenttime เปลี่ยนไปเรื่อยตามฟังชัน new Date 
 (โดยคำสั่งนี้จะทำงานตลอดไปตราบเท่าที่ยังเปิด chrome อยู่ ทำให้เกิด memory leak ได้ 
 เราแก้โดย ที่ componentWillUnmount เราต้องใช้คำสั่ง clearInterval(this.livetime) ก็จะยกเลิกการจับเวลาทุกๆ 1 second
 
 พอทำแล้วระบบจะ ค่า state จะเปลี่น และเรียกใช้ shouldComponentUpdate(),render(),getSnapshotBeforeUpdate()
 และ componentDidUpdate() อันนี้จะเกิดทุกครั้งที่ อัพเดต state 

import React, { Component } from "react";

export default class Workflow extends Component {
  
  // First
  
  constructor() {
    super();
    this.state = {};
    console.log("constructor");
  }

  // Second
  
  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps");
  }

  // Fourth
  
  componentDidMount() {
    console.log("componentDidMount");
  }

  // Fith (after update)
  
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  // Seventh (after update)
  
  getSnapshotBeforeUpdate() {
    console.log("getSnapshotBeforeUpdate");
    return true;
  }

  // Eighth (after update)
  
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  // Last
  
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    console.log("button clicked");
    this.setState({ pageTitle: "Workflow" });
  };

  handleKeyUp = e => {
    this.setState({ inputDetails: e.target.value });
  };

  // Third
  
  // Sixth (after update)
  
  render() {
    console.log("render");

    return (
      <div>
        <h1>Workflow</h1>

        <input type="text" onKeyUp={e => this.handleKeyUp(e)} />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}














