using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class UpdateTranslationInfoDto
    {
        public int TranslationId { get; set; }
        public int Repetitions { get; set; }
    }
}