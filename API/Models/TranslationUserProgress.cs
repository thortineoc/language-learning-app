using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TranslationUserProgress
    {
        public TranslationUserProgress()
        {
            timesRepeated = 0;
            isLearned = false;
            isToReview = false;
        }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public Translation Translation { get; set; }
        public int TranslationId { get; set; }
        public int timesRepeated { get; set; }
        public bool isLearned { get; set; }
        public bool isToReview { get; set; }
    }
}