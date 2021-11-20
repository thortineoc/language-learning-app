namespace API.Dtos
{
    public class CourseInformation
    {
        public int Id { get; set; }
        public string LanguageFrom { get; set; }
        public string LanguageTo { get; set; }
        public bool IsFinished { get; set; }
    }
}