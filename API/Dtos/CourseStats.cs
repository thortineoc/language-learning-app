using System.Collections.Generic;

namespace API.Dtos
{
    public class CourseStats
    {
        public int AllWordsSum { get; set; }
        public int LearnedWordsSum { get; set; }
        public List<int> LearnedWordsIds { get; set; }
    }
}