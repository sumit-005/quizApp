import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  result: any;
  id: any;
  tests: any;
  length;
  wrngAns: number;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    this.result = this.route.snapshot.params.name;
    this.id = this.route.snapshot.params.id;

    console.log(this.result);
    console.log(this.id);


    this.http
      .get<{ message: string; status: string; tests: any }>(
        'http://interviewapi.stgbuild.com/getQuizData'
      )
      .subscribe(res => {
        this.tests = res.tests;
        console.log(this.tests);
        this.length = this.tests[this.id].questions.length;
        console.log(this.length);


        this.wrngAns = this.length - this.result;
        if (this.wrngAns < 0) {
      this.wrngAns = 0;
    }



  });

}

}
