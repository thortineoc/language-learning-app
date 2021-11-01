using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TranslationUserProgress
    {
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public Translation Translation { get; set; }
        public int TranslationId { get; set; }
        public TranslationUserProgress()
        {
            TimesRepeated = 0;
            IsLearned = false;
            IsToReview = false;
        }
        
        public int TimesRepeated { get; set; }
        public bool IsLearned { get; set; }
        public bool IsToReview { get; set; }
       
    }
}