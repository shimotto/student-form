import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  preserveWhitespaces: true
})
export class StudentsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  students: any[] = [];
  student = {
    name: '',
    father_name: '',
    school_name: '',
    class: '',
    teacher_name: '',
    address: ''
  };
  classOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  editIndex: number | null = null;
  disableDelete: boolean = false;
  pageSize = 4;
  currentPage = 1;

  ngOnInit() {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        this.students = JSON.parse(savedStudents);
      }
    } catch (error) {
      console.error('Error retrieving students from local storage:', error);
    }
  }

  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
    this.editIndex = null;
    this.disableDelete = false; 
    this.resetForm();
  }

  addStudent(form: NgForm) {
    if (
      this.student.name.trim() &&
      this.student.father_name.trim() &&
      this.student.school_name.trim() &&
      this.student.class.trim() &&
      this.student.teacher_name.trim()
    ) {
      if (this.editIndex !== null) {
        this.students[this.editIndex] = { ...this.student };
        this.editIndex = null;
      } else {
        this.students.splice(0, 0, { ...this.student });
      }
      try {
        localStorage.setItem('students', JSON.stringify(this.students));
      } catch (error) {
        console.error('Error saving students to local storage:', error);
      }
      this.resetForm();
      form.resetForm(); 
      
    } else {
      alert('Please fill in all required fields before submitting.');
    }
  }

  onEdit(index: number) {
    const globalIndex = index + this.pageSize * (this.currentPage - 1); 
    this.editIndex = globalIndex;
    this.student = { ...this.students[globalIndex] };
    this.disableDelete = true;
    this.openSidePanel();
  }

  onDelete(index: number) {
    const globalIndex = index + this.pageSize * (this.currentPage - 1);
    if (confirm('Are you sure you want to delete this student?')) {
      this.students.splice(globalIndex, 1);
      try {
        localStorage.setItem('students', JSON.stringify(this.students));
      } catch (error) {
        console.error('Error saving students to local storage:', error);
      }

      
      const totalPages = Math.ceil(this.students.length / this.pageSize);
      if (this.currentPage > totalPages) {
        this.currentPage = totalPages; 
      }
    }
  }

  resetForm() {
    this.student = {
      name: '',
      father_name: '',
      school_name: '',
      class: '',
      teacher_name: '',
      address: '' 
    };
  }
}
