

// Constants
const studentItem = $('.student-item');
const studentSearch ='<div class="student-search"><input id="search" placeholder="Search students"><button>Search</button></div>';
const pagination ='<div class="pagination"><ul></ul></div>';
const studentList = pages(studentItem);

// Append filter search students
$('.page-header.cf').append(studentSearch);



// Generate an array of students for each page. Max 10 students.
function pages(list) {
	let listInit = list.slice();
	let maxPages = [];
	while (listInit.length) {
		maxPages.push(listInit.splice(0,10));
	}
	return maxPages;
}

// After generating the pages array of students, display the first page, hide the rest. 
function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}

// Append buttons dynamically to page
function appendButtons(pageList) {
	$('.page').append(pagination);
	let pageNumber = pageList.length;
	for (let i = 1; i <= pageNumber; i++) {
		let buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

	//Add click listeners
	  $(".pagination ul li a").on("click", function(e) {
	    let pageSelection = parseInt($(this)[0].text) - 1;
	    showPages(pageSelection, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");
	    e.preventDefault();
	  });
}

	
// Search function finds by name. If no results are found, NO RESULT is displayed in the title. 
function searchlistStudents() {	
    let searchTerm = $('#search').val().toLowerCase().trim();

        let studentSearch = studentItem.filter(function(i) {
            let studentNames = $(this).find('h3').text();
            if (studentNames.indexOf(searchTerm) > -1 ) {
                return true;
            }
            return false;
        });
        if (studentSearch.length === 0 ) {
        	$('.page-header h2').text('Search Again');
        } else {
        	$('.page-header h2').text('Students');
        }
        let paginated_students = pages(studentSearch);
        $('.pagination').remove();
        if (studentSearch.length >= 10) {
          appendButtons(paginated_students);
        }
        showPages(0, paginated_students);
}

// Inits
appendButtons(studentList);
showPages(0, studentList);

// Event Handlers
$('.student-search').find('button').on('click', searchlistStudents);
$('.student-search').find('input').keyup(searchlistStudents);
