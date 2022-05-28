
/*
function student(){
    var student1 ={
    name : '홍길동',
    grade: '대학교 1학년',
    toString: function(){
        return this.name+':'+this.grade;
    }
   
}
*/

var abc = 'abcde';

string = abc.toUpperCase();
console.log(string);

var array = ['A', 'B', 'C', 'D'];

var output ='';
for(var i =0; i<array.length; i++){
    output += i+':'+array[i]+"\n";
}

console.log(output);

var array2 = [5,3,4,2,1];



console.log(array2.sort()); 

array2.sort(function(left, light){
        return left - light;
});

console.log(array2);

function Student3(name, math, korean, english, science){
    this.이름 = name;
    this.수학 = math;
    this.영어 = english;
    this.국어 = korean;
    this.과학 = science;

     this.getSum =function(){
        return this.국어 + this.수학+this.과학+this.영어;
    };
}

var student=[];
student.push(new Student3('윤하린',90,80,70,40));

console.log(student.pop());


var result = array2.reduce(function(a, b){
    return a + b;
});

console.log(result);

var filteredA = array2.filter(function(item){
    return item > 3;
});

console.log(filteredA);


var filteredB = array2.filter((a) => a > 4);

console.log(filteredB);

function student(){
    var output = '';
    for(var key in window){
     output += 'ㅁ'+key+ ':'+window[key]+'\n'
    }
    alert(output);
     
    }

    