import { NgFor } from '@angular/common';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Post } from '../../model/post';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('closeModalbutton') closeModalbutton: any;
  @ViewChild('closeEditModalbutton') closeEditModalbutton: any;
  post: Post = {
    _id: '',
    title: '',
    content: '',
    username: '',
  };
  _id = '';
  title = '';
  content = '';
  username = '';

  allPosts: Post[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this._id = '';
    this.title = '';
    this.content = '';
    this.username = '';
    this.getAllPosts();
  }
  getAllPosts() {
    this.service.getAllData().subscribe({
      next: (res) => {
        console.log('GetAllPost-Response', res);
        this.allPosts = res;
      },
      error: (e) => {
        console.log('GetAllPost-Response', e?.message);
      },
    });
  }

  getPostById(id: string) {
    this.service.getPostById(id).subscribe({
      next: (res) => {
        console.log('getPostById-Response', res);
      },
      error: (e) => {
        console.log('getPostById-Response', e?.message);
      },
    });
  }

  deletePostById(post: Post) {
    if (
      window.confirm('Are you Sure You want to delete this Post ( ' + post._id +' )')
    ) {
      this.service.deletePostById(post._id).subscribe({
        next: (res) => {
          console.log('deletePostById-Response', res);
          this.ngOnInit();
        },
        error: (e) => {
          console.log('deletePostById-Response', e?.message);
        },
      });
    }
  }

  createPost() {
    this.post.title = this.title;
    this.post.username = this.username;
    this.post.content = this.content;

    console.log('this.post', this.post);

    this.service.createPost(this.post).subscribe({
      next: (res) => {
        this.closeModalbutton.nativeElement.click();
        console.log('createPost-Response', res);

        this.ngOnInit();
      },
      error: (e) => {
        console.log('createPost-Response', e?.message);
      },
    });
  }

  editPost(post: Post) {
    // console.log('edit', post);
    this._id = post._id;
    this.title = post.title;
    this.content = post.content;
    this.username = post.username;

    console.log(this.title, this.content, this.username);
  }

  updatePost() {
    if (this.title == ' ' || this.content == '' || this.username == '') {
      return alert('Please fill all field to update');
    }
    this.post._id = this._id;
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;

    this.service.updatePost(this.post).subscribe({
      next: (res) => {
        console.log('updatePost-Response', res);
        this.closeEditModalbutton.nativeElement.click();
        this.ngOnInit();
      },
      error: (e) => {
        console.log('updatePost-Response', e?.message);
      },
    });
  }
}
